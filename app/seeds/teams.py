from app.models import db, User, Team, UserTeam, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_teams():
    # get users so we can assign them as owners
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bob = User.query.filter_by(email='bob@aa.io').first()
    alice = User.query.filter_by(email='alice@aa.io').first()
    user5 = User.query.filter_by(email='user5@aa.io').first()
    user6 = User.query.filter_by(email='user6@aa.io').first()
    user7 = User.query.filter_by(email='user7@aa.io').first()
    user8 = User.query.filter_by(email='user8@aa.io').first()

    demo_team = Team(
        owner_id=demo.id,
        name='Demo Team',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    team2 = Team(
        owner_id=marnie.id,
        name='Team 2',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    team3 = Team(
        owner_id=alice.id,
        name='Team 3',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    team4 = Team(
        owner_id=bob.id,
        name='Team 4',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    team5 = Team(
        owner_id=user5.id,
        name='Team 5',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    team6 = Team(
        owner_id=user6.id,
        name='Team 6',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    team7 = Team(
        owner_id=user7.id,
        name='Team 7',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    team8 = Team(
        owner_id=user8.id,
        name='Team 8',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )


    db.session.add(demo_team)
    db.session.add(team2)
    db.session.add(team3)
    db.session.add(team4)
    db.session.add(team5)
    db.session.add(team6)
    db.session.add(team7)
    db.session.add(team8)

    #  adding a member to a team

    # bobbie_membership = UserTeam(
    #     user_id=bobbie.id,
    #     team_id=demo_team.id
    # )
    # db.session.add(bobbie_membership)

    db.session.commit()

def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_team RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))
        db.session.execute(text("DELETE FROM user_team"))

    db.session.commit()
