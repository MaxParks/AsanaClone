from app.models import db, User, Team, Project, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_projects():
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bob = User.query.filter_by(email='bob@aa.io').first()
    alice = User.query.filter_by(email='alice@aa.io').first()
    user5 = User.query.filter_by(email='user5@aa.io').first()
    user6 = User.query.filter_by(email='user6@aa.io').first()
    user7 = User.query.filter_by(email='user7@aa.io').first()
    user8 = User.query.filter_by(email='user8@aa.io').first()

    demo_team = Team.query.filter_by(name='Demo Team').first()

    project1 = Project(
        owner_id=demo.id,
        team_id=demo_team.id,
        name='Demo Project',
        due_date=datetime(2023, 12, 31),
        description='This is a project from demo',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project2 = Project(
        owner_id=marnie.id,
        team_id=demo_team.id,
        name='Project 2',
        due_date=datetime(2023, 11, 30),
        description='This is another project',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project3 = Project(
        owner_id=alice.id,
        team_id=demo_team.id,
        name='Project 3',
        due_date=datetime(2023, 10, 15),
        description='This is project 3',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project4 = Project(
        owner_id=bob.id,
        team_id=demo_team.id,
        name='Project 4',
        due_date=datetime(2023, 9, 1),
        description='This is project 4',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project5 = Project(
        owner_id=user5.id,
        team_id=demo_team.id,
        name='Project 5',
        due_date=datetime(2023, 8, 23),
        description='This is project 5',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project6 = Project(
        owner_id=user6.id,
        team_id=demo_team.id,
        name='Project 6',
        due_date=datetime(2023, 7, 12),
        description='This is project 6',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project7 = Project(
        owner_id=user7.id,
        team_id=demo_team.id,
        name='Project 7',
        due_date=datetime(2023, 6, 29),
        description='This is project 7',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project8 = Project(
        owner_id=user8.id,
        team_id=demo_team.id,
        name='Project 8',
        due_date=datetime(2023, 5, 18),
        description='This is project 8',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.add(project4)
    db.session.add(project5)
    db.session.add(project6)
    db.session.add(project7)
    db.session.add(project8)

    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
