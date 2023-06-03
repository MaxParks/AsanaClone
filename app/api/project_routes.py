from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Project, User, Task
from datetime import datetime

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<int:id>', methods=['GET'])
@login_required
def retrieve_project(id):
    """
    Retrieves a specific project by its ID, and its associated tasks.
    """
    project = Project.query.get(id)
    if project:
        project_dict = project.to_dict()
        project_dict['tasks'] = []

        # Add project's tasks
        for task in project.tasks:
            task_dict = {
                'id': task.id,
                'name': task.name,
                'description': task.description,
                'due_date': task.due_date.isoformat(),
                'completed': task.completed,
                'assigned_to': task.assigned_to,
            }
            project_dict['tasks'].append(task_dict)

        return jsonify(project_dict)
    else:
        return {"message": "Project not found", "statusCode": 404}, 404




@project_routes.route('/', methods=['POST'])
@login_required
def create_project():
    """
    Creates a new project.
    """
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    date_string = data['due_date']
    due_date = datetime.strptime(date_string, '%m/%d/%Y')
    team_id = data.get('team_id')

    if not name or not description or not due_date or not team_id:
        return {"message": "Invalid request body", "statusCode": 400}, 400

    owner_id = current_user.id  # Use the authenticated user's ID as the owner_id

    new_project = Project(name=name, description=description, due_date=due_date, owner_id=owner_id, team_id=team_id, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict()), 201



@project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_project(id):
    """
    Updates a specific project by its ID.
    """
    project = Project.query.get(id)
    if not project:
        return {"message": "Project not found", "statusCode": 404}, 404

    # Check if the current user is the owner of the project
    if current_user.id != project.owner_id:
        return {"message": "Unauthorized", "statusCode": 403}, 403

    data = request.get_json()
    name = data.get('name')
    date_string = data['due_date']
    due_date = datetime.strptime(date_string, '%m/%d/%Y')
    description = data.get('description')

    if not name or not description or not due_date:
        return {"message": "Invalid request body", "statusCode": 400}, 400

    project.name = name
    project.description = description
    project.due_date = due_date
    project.updated_at = datetime.utcnow()
    db.session.commit()
    return jsonify(project.to_dict()), 200



@project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    """
    Deletes a specific project by its ID.
    """
    project = Project.query.get(id)
    if project:
        # Check if the current user is the owner of the project
        if project.owner_id != current_user.id:
            return {"message": "Unauthorized", "statusCode": 403}, 403
        db.session.delete(project)
        db.session.commit()
        return {"message": "Successfully Deleted."}, 204
    else:
        return {"message": "Project not found", "statusCode": 404}, 404
