from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Team, User, Project, UserTeam
from datetime import datetime

team_routes = Blueprint('teams', __name__)

def find_user_by_email(email):
    return User.query.filter(User.email == email).first()

@team_routes.route('/', methods=['GET'])
@login_required
def get_teams():
    """
    Retrieves the teams associated with the current user.
    """
    user_id = current_user.id
    teams = Team.query.join(UserTeam).filter(UserTeam.user_id == user_id).all()
    teams_data = []
    for team in teams:
        members_data = [
            {
                'id': member.id,
                'team_id': member.team_id,
                'user_id': member.user_id,
                'name': member.user.firstName
            }
            for member in team.members
        ]
        team_dict = {
            'id': team.id,
            'name': team.name,
            'members': members_data,
            'projects': [project.to_dict() for project in team.projects],
        }
        teams_data.append(team_dict)
    return jsonify(teams_data), 200


@team_routes.route('/<int:id>/members', methods=['POST'])
@login_required
def invite_team_member(id):
    """
    Invites a user to join a team.
    """
    team = Team.query.get(id)
    if not team:
        return {"message": "Team not found", "statusCode": 404}, 404

    if current_user.id != team.owner_id:
        return {"message": "Unauthorized", "statusCode": 403}, 403

    data = request.get_json()
    email = data.get('email')

    if not email:
        return {"message": "Invalid request body", "statusCode": 400}, 400

    user = User.query.filter(User.email == email).first()
    if not user:
        return {"message": "User not found", "statusCode": 404}, 404

    if user in team.members:
        return {"message": "User is already a member of the team", "statusCode": 400}, 400

    user_team = UserTeam(user_id=user.id, team_id=team.id)
    db.session.add(user_team)
    db.session.commit()

    return jsonify(user_team.to_dict()), 201


@team_routes.route('/', methods=['POST'])
@login_required
def create_team():
    data = request.get_json()
    name = data.get('name')
    members_emails = data.get('members')

    if not name or not members_emails:
        return {"message": "Invalid request body", "statusCode": 400}, 400

    new_team = Team(name=name, owner_id=current_user.id, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    db.session.add(new_team)
    db.session.flush()

    # Add members to the team
    for email in members_emails:
        user = find_user_by_email(email)
        if user:
            new_user_team = UserTeam(user_id=user.id, team_id=new_team.id)
            db.session.add(new_user_team)
        else:
            return {"message": f"User with email {email} not found", "statusCode": 400}, 400

    db.session.commit()

    return jsonify(new_team.to_dict()), 201

@team_routes.route('/<int:id>', methods=['GET'])
@login_required
def retrieve_team(id):
    team = Team.query.get(id)
    if team:
        team_dict = team.to_dict()
        team_dict['members'] = [user_team.user.to_dict() for user_team in team.members]
        team_dict['projects'] = [project.to_dict() for project in team.projects]
        return jsonify(team_dict)
    else:
        return {"message": "Team not found", "statusCode": 404}, 404

@team_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_team(id):
    data = request.get_json()
    name = data.get('name')
    new_member_email = data.get('new_member')

    team = Team.query.get(id)
    if not team:
        return {"message": "Team not found", "statusCode": 404}, 404

    # Check if the current user is the owner of the project
    if current_user.id != team.owner_id:
        return {"message": "Unauthorized", "statusCode": 403}, 403

    if not name and not new_member_email:
        return {"message": "Invalid request body", "statusCode": 400}, 400

    if name:
        team.name = name

    if new_member_email:
        new_member = find_user_by_email(new_member_email)
        if new_member:
            new_user_team = UserTeam(user_id=new_member.id, team_id=team.id)
            db.session.add(new_user_team)
        else:
            return {"message": "User not found", "statusCode": 404}, 404

    team.updated_at = datetime.utcnow()
    db.session.commit()

    return jsonify(team.to_dict()), 200

@team_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_team(id):
    team = Team.query.get(id)
    if team:
        if team.owner_id != current_user.id:
            return {"message": "Unauthorized", "statusCode": 403}, 403
        db.session.delete(team)
        db.session.commit()
        return {"message": "Successfully Deleted."}, 204
    else:
        return {"message": "Team not found", "statusCode": 404}, 404
