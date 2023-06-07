
from app.models import db, User, Team, UserTeam, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_user_teams():
    # Get our users and a team
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bob = User.query.filter_by(email='bob@aa.io').first()
    alice = User.query.filter_by(email='alice@aa.io').first()
    user5 = User.query.filter_by(email='user5@aa.io').first()
    user6 = User.query.filter_by(email='user6@aa.io').first()
    user7 = User.query.filter_by(email='user7@aa.io').first()
    user8 = User.query.filter_by(email='user8@aa.io').first()

    demo_team = Team.query.filter_by(name='Demo Team').first()

    demo_membership = UserTeam(
        user_id=demo.id,
        team_id=demo_team.id
    )

    marnie_membership = UserTeam(
        user_id=marnie.id,
        team_id=demo_team.id
    )

    alice_membership = UserTeam(
        user_id=alice.id,
        team_id=demo_team.id
    )

    bob_membership = UserTeam(
        user_id=bob.id,
        team_id=demo_team.id
    )

    membership5 = UserTeam(
        user_id=user5.id,
        team_id=demo_team.id
    )

    membership6 = UserTeam(
        user_id=user6.id,
        team_id=demo_team.id
    )

    membership7 = UserTeam(
        user_id=user7.id,
        team_id=demo_team.id
    )

    membership8 = UserTeam(
        user_id=user8.id,
        team_id=demo_team.id
    )

    db.session.add(demo_membership)
    db.session.add(bob_membership)
    db.session.add(alice_membership)
    db.session.add(marnie_membership)
    db.session.add(membership5)
    db.session.add(membership6)
    db.session.add(membership7)
    db.session.add(membership8)

    db.session.commit()


def undo_user_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_team RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_team"))

    db.session.commit()
