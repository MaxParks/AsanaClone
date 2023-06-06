from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user
from app.models import db, Project, User, Task, Team, UserTeam
from app.forms import ProjectForm
from datetime import datetime

project_routes = Blueprint('projects', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def get_team_members_dict(project):
    team_id = project.team_id

    user_ids = [user_id[0] for user_id in UserTeam.query.filter_by(team_id=team_id).distinct().values(UserTeam.user_id)]

    team_members = User.query.filter(User.id.in_(user_ids)).all()

    team_members_dict = {}
    for member in team_members:
        user_info = {
            'firstName': member.firstName,
            'lastName': member.lastName,
            'email': member.email
        }
        team_members_dict[member.id] = user_info

    return team_members_dict


# -------------- GET PROJECT --------------------
@project_routes.route('/<int:id>', methods=['GET'])
@login_required
def retrieve_project(id):

    project = Project.query.get(id)
    print("----------------------", project)

    if not project:
        return {"message": "Project not found", "statusCode": 404}, 404

    team_members_dict = get_team_members_dict(project)

    if current_user.id != project.owner_id:
        if current_user.id not in team_members_dict:
                    return {"message": "Unauthorized", "statusCode": 403}, 403

    project_dict = project.to_dict()
    project_dict['tasks'] = []

    sorted_tasks = sorted(project.tasks, key=lambda task: task.due_date, reverse=False)

    for task in sorted_tasks:
        task_dict = {
            'id': task.id,
            'name': task.name,
            'description': task.description,
            'due_date': task.due_date.isoformat(),
            'completed': task.completed,
            'assigned_to': task.assigned_to,
        }
        project_dict['tasks'].append(task_dict)

        project_dict['team_members'] = team_members_dict

    return jsonify(project_dict)



# -------------- CREATE PROJECT --------------------
@project_routes.route('/', methods=['POST'])
@login_required
def create_project():
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        due_date_str = form.data['due_date']
        due_date = datetime.strptime(due_date_str, '%m/%d/%Y').date() if due_date_str else None

        project = Project(
            owner_id = current_user.id,
            team_id = form.data['team_id'],
            name = form.data['name'],
            due_date = due_date,
            description = form.data['description']
        )
        db.session.add(project)
        db.session.commit()
        return project.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict()), 201



# -------------- UPDATE PROJECT --------------------
@project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_project(id):
    project = Project.query.get(id)
    if not project:
        return {"message": "Project not found", "statusCode": 404}, 404

    team_id = project.team_id
    team = Team.query.filter_by(id=team_id).options(joinedload('owner')).first()
    owner_id = team.owner_id

    if current_user.id != project.owner_id and current_user.id != team.owner_id:
        return {"message": "Unauthorized", "statusCode": 403}, 403

    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        team_id = form.data['team_id']
        name = form.data['name']
        due_date_str = form.data['due_date']
        due_date = datetime.strptime(due_date_str, '%m/%d/%Y').date() if due_date_str else None
        description = form.data['description']

        project.team_id = team_id
        project.name = name
        project.due_date = due_date
        project.description = description
        project.updated_at = datetime.utcnow()
        db.session.commit()

        return jsonify(project.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# -------------- DELETE PROJECT --------------------
@project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    project = Project.query.get(id)
    if not project:
        return {"message": "Project not found", "statusCode": 404}, 404

    team_id = project.team_id
    team = Team.query.filter_by(id=team_id).options(joinedload('owner')).first()
    owner_id = team.owner_id

    if project.owner_id != current_user.id and current_user.id != team.owner_id:
        return {"message": "Unauthorized", "statusCode": 403}, 403

    db.session.delete(project)
    db.session.commit()
    return {"message": "Successfully Deleted."}, 204
