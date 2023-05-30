
from app.models import db, User, Team, UserTeam, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_user_teams():
    # Get our users and a team
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bobbie = User.query.filter_by(email='bobbie@aa.io').first()
    marnie_team = Team.query.filter_by(name='Best').first()

    # Add demo and bobbie to Marnie's team
    demo_membership = UserTeam(
        user_id=demo.id,
        team_id=marnie_team.id
    )
    bobbie_membership = UserTeam(
        user_id=bobbie.id,
        team_id=marnie_team.id
    )

    db.session.add(demo_membership)
    db.session.add(bobbie_membership)

    db.session.commit()


def undo_user_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_team RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_team"))

    db.session.commit()
