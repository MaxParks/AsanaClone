from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Project

dashboard_routes = Blueprint('dashboard_routes', __name__)

@dashboard_routes.route('/api/user/dashboard', methods=['GET'])
@login_required  # Require authentication
def get_user_dashboard():
    """
    Retrieves the user's relevant tasks and projects for the dashboard
    """
    user = current_user
    user_teams = user.user_teams  # Access the user_teams relationship defined in the User model
    assigned_tasks = user.assigned_tasks

    dashboard_data = {
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'assigned_tasks': [],
        'projects': []
    }

    # Add user's assigned tasks
    for task in assigned_tasks:
        task_data = task.to_dict()
        task_dict = {
            'id': task_data['id'],
            'name': task_data['name'],
            'description': task_data['description'],
            'due_date': task_data['due_date'],
            'completed': task_data['completed'],
            'owner': task_data['owner']['firstName'],
            'assignee': task_data['assignee'],
            'project': task_data['project']['name'],
            'comments': []
        }

        # Add task comments
        comments = task_data.get('comments', {})
        for comment in comments.values():
            comment_dict = {
                'comment': comment['comment'],
                'created_at': comment['created_at'],
                'user': comment['user']['firstName']
            }
            task_dict['comments'].append(comment_dict)

        dashboard_data['assigned_tasks'].append(task_dict)

    # Add projects associated with user's teams
    for user_team in user_teams:
        team_id = user_team.team.id
        projects = Project.query.filter_by(team_id=team_id).all()

        for project in projects:
            project_dict = {
                'id': project.id,
                'name': project.name,
                'description': project.description
            }
            dashboard_data['projects'].append(project_dict)

    return jsonify(dashboard_data), 200





# from flask import Blueprint, jsonify
# from flask_login import login_required, current_user
# from app.models import db, User, Task, Team, Project

# dashboard_routes = Blueprint('dashboard_routes', __name__)

# @dashboard_routes.route('/api/user/dashboard', methods=['GET'])
# @login_required  # Require authentication
# def get_user_dashboard():
#     """
#     Retrieves the user's relevant tasks and projects for the dashboard
#     """
#     user = current_user

#     dashboard_data = {
#         'id': user.id,
#         'firstName': user.firstName,
#         'lastName': user.lastName,
#         'email': user.email,
#         'assigned_tasks': [],
#         'projects': [],
#         'teams': []
#     }

#     # Get user's assigned tasks and related info
#     for task in user.assigned_tasks:
#         dashboard_data['assigned_tasks'].append(task.to_dict())

#     # Get teams associated with user
#     for user_team in user.user_teams:
#         team = user_team.team
#         team_dict = team.to_dict()
#         team_dict['user_team_id'] = user_team.id
#         dashboard_data['teams'].append(team_dict)

#         # Get projects associated with user's teams
#         for project in team.projects:
#             dashboard_data['projects'].append(project.to_dict())

#     # Get user's owned projects
#     for project in user.owned_projects:
#         dashboard_data['projects'].append(project.to_dict())

#     return jsonify(dashboard_data), 200
