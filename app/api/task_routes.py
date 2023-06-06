from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, TaskComment, User, Project
from datetime import datetime

tasks_routes = Blueprint('tasks', __name__)

@tasks_routes.route('/<int:id>', methods=['GET'])
@login_required
def retrieve_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    # # Check if the current user is the owner of the task or the task is assigned to the current user
    # if current_user.id != task.owner_id and current_user.id != task.assigned_to:
    #     return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    # Check if the current user is the owner of the task or part of the team associated with the project
    if current_user.id != task.owner_id and current_user.id not in [user.id for user in task.project.team.members]:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    task_dict = task.to_dict()
    task_dict['comments'] = [comment.to_dict() for comment in task.comments]
    return jsonify([task_dict]), 200

# @tasks_routes.route('/current', methods=['GET'])
# @login_required
# def retrieve_user_tasks():
#     """
#     Retrieves tasks assigned to the current User.
#     """
#     user_id = current_user.id
#     tasks = Task.query.filter(Task.assigned_to == user_id).all()
#     tasks_data = {}
#     for task in tasks:
#         tasks_data[task.id] = {
#             'name': task.name,
#             'description': task.description,
#             'due_date': task.due_date.strftime('%m/%d/%Y'),
#             'completed': str(task.completed),
#             'owner': {
#                 'firstName': task.owner.firstName,
#             },
#             'assignee': task.assignee.firstName,
#             'project': {
#                 'name': task.project.name
#             },
#             'comments': {}
#         }
#         for comment in task.comments:
#             tasks_data[task.id]['comments'][comment.id] = {
#                 'comment': comment.comment,
#                 'created_at': comment.created_at.strftime('%m/%d/%Y'),
#                 'user': {
#                     'firstName': comment.user.firstName
#                 }
#             }
#     return jsonify({'Tasks': tasks_data}), 200

@tasks_routes.route('/', methods=['GET'])
@login_required
def retrieve_user_tasks():
    user_id = current_user.id
    tasks = Task.query.filter(Task.assigned_to == user_id).all()
    tasks_data = [task.to_dict() for task in tasks]
    return jsonify(tasks_data), 200

@tasks_routes.route('/', methods=['POST'])
@login_required
def create_task():
    """
    Creates a new task.
    """
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    assigned_to = data.get('assigned_to')
    due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date()
    completed = data.get('completed')
    project_id = data.get('project_id')

    if not name or not description or not assigned_to or not due_date or not completed or not project_id:
        return jsonify({'message': 'Invalid request body', 'statusCode': 400}), 400

    project = Project.query.get(project_id)
    if not project:
        return jsonify({'message': 'Project not found', 'statusCode': 404}), 404

    # # Check if the current user is part of the project
    # if current_user.id not in [user.id for user in project.team.members]:
    #     return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    # Check if the current user is associated with the project
    if current_user not in project.team.members and current_user != project.owner:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    owner_id = current_user.id

    new_task = Task(
        name=name,
        description=description,
        assigned_to=assigned_to,
        due_date=due_date,
        completed=completed,
        project_id=project_id,
        owner_id=owner_id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task.to_dict()), 201

@tasks_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_task(id):
    """
    Updates a specific task by its ID.
    """
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    if current_user.id != task.owner_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    assigned_to = data.get('assigned_to')
    due_date = datetime.strptime(data['due_date'], '%Y-%m-%d').date()
    completed = data.get('completed')
    project_id = data.get('project_id')

    if not name or not description or not assigned_to or not due_date or not completed or not project_id:
        return jsonify({'message': 'Invalid request body', 'statusCode': 400}), 400

    task.name = name
    task.description = description
    task.assigned_to = assigned_to
    task.due_date = due_date
    task.completed = completed
    task.project_id = project_id
    task.updated_at = datetime.utcnow()
    db.session.commit()

    return jsonify(task.to_dict()), 200

@tasks_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task(id):
    """
    Deletes a specific task by its ID.
    """
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    if current_user.id != task.owner_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    db.session.delete(task)
    db.session.commit()

    return '', 204

# COMMENTS SECTION

@tasks_routes.route('/<int:id>/comments', methods=['GET'])
@login_required
def get_task_comments(id):
    """
    Retrieves comments for a specific task by its ID.
    """
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    project = task.project
    if not project:
        return jsonify({'message': 'Project not found', 'statusCode': 404}), 404

    # # Check if the current user is associated with the project
    # if current_user.id not in [user.id for user in project.team.members]:
    #     return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    comments = TaskComment.query.filter_by(task_id=id).all()
    # comments_data = [comment.to_dict() for comment in comments]
    # return jsonify(comments_data), 200
    comments_data = []
    for comment in comments:
        comment_dict = {
            'id': comment.id,
            'comment': comment.comment,
            'created_at': comment.created_at.strftime('%m/%d/%Y'),
            'user': {
                'firstName': comment.user.firstName,
            },
        }
        comments_data.append(comment_dict)

    task_data = {
        'id': task.id,
        'name': task.name,
        'assignee': task.assigned_to,
        'description': task.description,
        'due_date': task.due_date.strftime('%m/%d/%Y'),
        'comments': comments_data,
    }

    return jsonify(task_data), 200

@tasks_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def create_task_comment(id):
    """
    Creates a new comment for a specific task by its ID.
    """
    task = Task.query.get(id)
    if not task:
        return jsonify({'message': 'Task not found', 'statusCode': 404}), 404

    # # Check if the current user is part of the project associated with the task
    # if current_user.id not in [user.id for user in task.project.team.members]:
    #     return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403


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

@tasks_routes.route('/comments/<int:id>', methods=['PUT'])
@login_required
def update_task_comment(id):
    """
    Updates a specific comment by its ID.
    """
    comment = TaskComment.query.get(id)
    if not comment:
        return jsonify({'message': 'Comment not found', 'statusCode': 404}), 404

    # Check if the current user is the owner of the comment
    if current_user.id != comment.user_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    data = request.get_json()
    comment_text = data.get('comment')

    if not comment_text:
        return jsonify({'message': 'Invalid request body', 'statusCode': 400}), 400

    comment.comment = comment_text
    db.session.commit()

    return jsonify(comment.to_dict()), 200



@tasks_routes.route('/comments/<int:id>', methods=['DELETE'])
@login_required
def delete_task_comment(id):
    """
    Deletes a specific comment by its ID.
    """
    comment = TaskComment.query.get(id)
    if not comment:
        return jsonify({'message': 'Comment not found', 'statusCode': 404}), 404

    # Check if the current user is the owner of the comment
    if current_user.id != comment.user_id:
        return jsonify({'message': 'Unauthorized', 'statusCode': 403}), 403

    db.session.delete(comment)
    db.session.commit()

    return '', 204
