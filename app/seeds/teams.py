from app.models import db, User, Team, UserTeam, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_teams():
    # get users so we can assign them as owners
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bobbie = User.query.filter_by(email='bobbie@aa.io').first()


    demo_team = Team(
        owner_id=demo.id,
        name='Demo Team',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    marnie_team = Team(
        owner_id=marnie.id,
        name='Best',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    bobbie_team = Team(
        owner_id=bobbie.id,
        name='Brilliance',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )


    db.session.add(demo_team)
    db.session.add(marnie_team)
    db.session.add(bobbie_team)

    #  adding a member to a team

    # bobbie_membership = UserTeam(
    #     user_id=bobbie.id,
    #     team_id=demo_team.id
    # )
    # db.session.add(bobbie_membership)

    # db.session.commit()

def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_team RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))
        db.session.execute(text("DELETE FROM user_team"))

    db.session.commit()
