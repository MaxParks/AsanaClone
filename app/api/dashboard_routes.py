from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Task, Team, Project
from app.utils import normalize_objects
from datetime import date, timedelta

dashboard_routes = Blueprint('dashboard_routes', __name__)

@dashboard_routes.route('/', methods=['GET'])
@login_required
def get_user_dashboard():

    user = current_user

    today = date.today()
    tomorrow = today + timedelta(days=1)

    due_today_or_tomorrow = []
    for task in user.assigned_tasks:
        if task.due_date == today or task.due_date == tomorrow or task.due_date is None:
            due_today_or_tomorrow.append(task)


    dashboard_data = {
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'assigned_tasks': normalize_objects(sorted(due_today_or_tomorrow, key=lambda task: task.due_date or date.min)),
        'projects': normalize_objects(user.owned_projects),
        'teams': normalize_objects(user.user_teams)
    }

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
