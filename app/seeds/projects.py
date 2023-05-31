from app.models import db, Project, User, Team, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_projects():
    # get users so we can assign them as owners
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bobbie = User.query.filter_by(email='bobbie@aa.io').first()

    demo_team = Team.query.filter_by(name='Demo Team').first()
    marnie_team = Team.query.filter_by(name='Best').first()
    bobbie_team = Team.query.filter_by(name='Brilliance').first()



    demo_project = Project(
        owner_id=demo.id,
        team_id=demo_team.id,
        name='Demo Project',
        due_date='9/23/24',
        description='This is a project that is fake but being used for seeding purposes',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    marnie_project = Project(
        owner_id=marnie.id,
        team_id=marnie_team.id,
        name='Marnie Project',
        due_date='10/3/23',
        description='Marnies project',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    bobbie_project = Project(
        owner_id=bobbie.id,
        team_id=bobbie_team.id,
        name='Bobbie Project',
        due_date='1/3/24',
        description='Bobbies project',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )


    db.session.add(demo_project)
    db.session.add(marnie_project)
    db.session.add(bobbie_project)

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_team RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
