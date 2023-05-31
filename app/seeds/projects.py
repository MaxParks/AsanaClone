from app.models import db, User, Team, Project, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_projects():
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    demo_team = Team.query.filter_by(name='Demo Team').first()

    # Create some projects
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
        due_date=datetime(2024, 12, 31),
        description='This is a project from Marnie',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(project1)
    db.session.add(project2)

    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
