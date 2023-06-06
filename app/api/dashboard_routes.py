from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Task, Team, Project
from app.utils import normalize_objects

dashboard_routes = Blueprint('dashboard_routes', __name__)

@dashboard_routes.route('/', methods=['GET'])
@login_required
def get_user_dashboard():
    """
    Retrieves the user's relevant tasks and projects for the dashboard
    """
    user = current_user

    print("------------------------", user.user_teams)

    dashboard_data = {
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'assigned_tasks': normalize_objects(sorted(user.assigned_tasks, key=lambda task: task.due_date)),
        'projects': normalize_objects(user.owned_projects),
        'teams': normalize_objects(user.user_teams)
    }

    # Get projects associated with user's teams
    # for user_team in user.user_teams:
    #     team = user_team.team
    #     dashboard_data['projects'].update(normalize_objects(team.projects))

    team_ids = set()

    # Get team IDs associated with the user's projects
    for project in user.owned_projects:
        if project.team_id:
            team_ids.add(project.team_id)

    # Get teams associated with the user's teams
    for user_team in user.user_teams:
        team_ids.add(user_team.team_id)

    # Fetch complete team information for the team IDs
    teams = Team.query.filter(Team.id.in_(team_ids)).all()
    teams_data = normalize_objects(teams)

    # Add team information to dashboard data
    dashboard_data['teams'] = teams_data

    return jsonify(dashboard_data), 200

# @dashboard_routes.route('/', methods=['GET'])
# @login_required
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
#         'assigned_tasks': normalize_objects(sorted(user.assigned_tasks, key=lambda task: task.due_date)),
#         'projects': normalize_objects(user.owned_projects),
#         'teams': normalize_objects(user.user_teams)
#     }

#     # Get projects associated with user's teams
#     for user_team in user.user_teams:
#         team = user_team.team
#         team_projects = normalize_objects(team.projects)
#         for project_id, project in team_projects.items():
#             project_tasks = [task.to_dict() for task in project['tasks']]
#             project['tasks'] = project_tasks
#         dashboard_data['projects'].update(team_projects)

#     team_ids = set()

#     # Get team IDs associated with the user's projects
#     for project in user.owned_projects:
#         if project.team_id:
#             team_ids.add(project.team_id)

#     # Get teams associated with the user's teams
#     for user_team in user.user_teams:
#         team_ids.add(user_team.team_id)

#     # Fetch complete team information for the team IDs
#     teams = Team.query.filter(Team.id.in_(team_ids)).all()
#     teams_data = normalize_objects(teams)

#     # Add team information to dashboard data
#     for team_id, team in teams_data.items():
#         team_members = []
#         for user_team in team['members']:
#             user = User.query.get(user_team)
#             if user:
#                 team_members.append(user.to_dict())
#         team['members'] = team_members

#     dashboard_data['teams'] = teams_data

#     return jsonify(dashboard_data), 200
