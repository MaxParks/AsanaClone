from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, TaskComment, User, Project
from app.forms import TaskForm
from datetime import datetime
from sqlalchemy.orm import joinedload


tasks_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# -------------- GET TASK BY ID  --------------------
@tasks_routes.route('/<int:id>', methods=['GET'])
@login_required
def retrieve_task(id):
    task = Task.query.get(id)

    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    # if current_user.id != task.owner_id and current_user.id not in [user.id for user in task.project.team.members]:
    #     return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    task_dict = task.to_dict()
    task_dict['comments'] = []

    for comment in task.comments:
        comment_dict = comment.to_dict()
        user = User.query.get(comment.user_id)
        if user:
            user_dict = {
                'first_name': user.firstName,
                'last_name': user.lastName
            }
            comment_dict['user'] = user_dict
        else:
            comment_dict['user'] = None

        task_dict['comments'].append(comment_dict)

    assigned_to_user = User.query.get(task.assigned_to)

    if assigned_to_user:
        assigned_to_user_dict = {
            'first_name': assigned_to_user.firstName,
            'last_name': assigned_to_user.lastName
        }
        task_dict['assigned_to'] = assigned_to_user_dict
    else:
        task_dict['assigned_to'] = None

    # Fetch the project data
    project = Project.query.filter_by(id=task.project_id).first()
    if project:
        project_dict = {
            'id': project.id,
            'name': project.name,
            'owner_id': project.owner_id
            # Add other project attributes you want to include
        }
        task_dict['project'] = project_dict
    else:
        task_dict['project'] = None


    return jsonify(task_dict), 200

# -------------- GET TASK BY CURRENT USER  --------------------
@tasks_routes.route('/', methods=['GET'])
@login_required
def retrieve_user_tasks():
    user_id = current_user.id
    tasks = Task.query.filter(Task.assigned_to == user_id).all()
    tasks_data = [task.to_dict() for task in tasks]
    return jsonify(tasks_data), 200

# -------------- CREATE TASK  --------------------
@tasks_routes.route('/', methods=['POST'])
@login_required
def create_task():

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        project_id = form.data['project_id']

        project = Project.query.get(project_id)
        print("----------------------------project", project)
        print("----------------------------project.team.members)", project.team.members)
        print("----------------------------current-user", current_user)

        user_team_ids = [(user_team.user_id, user_team.team_id) for user_team in project.team.members]
        print("----------------------------user_teams", user_team_ids)



        if not project:
            return jsonify({'message': 'Invalid project_id', 'statusCode': 400}), 400
        if (current_user.id, project.team_id) not in user_team_ids and current_user.id != project.owner_id:
            return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403


        due_date_str = form.data['due_date']
        due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date() if due_date_str else None

        task = Task(
            owner_id = current_user.id,
            name = form.data['name'],
            description = form.data['description'],
            assigned_to = form.data['assigned_to'],
            due_date = due_date,
            project_id = form.data['project_id']
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# -------------- UPDATE TASK BY ID  --------------------
@tasks_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    project_id = task.project_id
    project = Project.query.filter_by(id=project_id).options(joinedload('owner')).first()
    owner_id = project.owner_id

    if current_user.id != task.owner_id and current_user.id != project.owner_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403


    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task.name = form.name.data
        task.description = form.description.data
        task.assigned_to = form.assigned_to.data
        task.due_date = datetime.strptime(form.due_date.data, '%Y-%m-%d').date() if form.due_date.data else None
        task.completed = request.json["completed"]
        task.project_id = form.project_id.data
        task.updated_at = datetime.utcnow()
        db.session.commit()

        return jsonify(task.to_dict()), 200
    else:
        errors = form_errors(form)
        return jsonify({'message': 'Validation errors', 'errors': errors, 'statusCode': 400}), 400


# -------------- DELETE TASK  --------------------
@tasks_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    """
    Deletes a specific task by its ID.
    """
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    project_id = task.project_id
    project = Project.query.get(project_id)

    if current_user.id != task.owner_id and current_user.id != project.owner_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    db.session.delete(task)
    db.session.commit()

    return '', 204


# -------------- CREATE TASK COMMENT  --------------------
@tasks_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_task_comment(id):

    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    data = request.get_json()
    comment = data.get('comment')

    if not comment:
        return jsonify({'message': 'Invalid request body', 'statusCode': 400}), 400

    new_comment = TaskComment(
        user_id=current_user.id,
        task_id=id,
        comment=comment,
        created_at=datetime.utcnow()
    )
    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201

# -------------- DELETE TASK COMMENT  --------------------
@tasks_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_task_comment(comment_id):
    """
    Deletes a specific task comment by its ID.
    """
    comment = TaskComment.query.get(comment_id)
    if not comment:
        return jsonify({'message': 'Task comment not found', 'statusCode': 404}), 404

    task = Task.query.get(comment.task_id)
    project_id = task.project_id
    project = Project.query.get(project_id)

    if current_user.id != comment.user_id and current_user.id != task.owner_id and current_user.id != project.owner_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    db.session.delete(comment)
    db.session.commit()

    return '', 204
