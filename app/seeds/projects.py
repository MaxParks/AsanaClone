from app.models import db, User, Team, Project, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_projects():
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bob = User.query.filter_by(email='bob@aa.io').first()
    alice = User.query.filter_by(email='alice@aa.io').first()
    user5 = User.query.filter_by(email='joe@aa.io').first()
    user6 = User.query.filter_by(email='steve@aa.io').first()
    user7 = User.query.filter_by(email='sheila@aa.io').first()
    user8 = User.query.filter_by(email='lacy@aa.io').first()

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
    name='Quantum Analysis Software',
    due_date=datetime(2023, 11, 30),
    description='Building a software for quantum data analysis.',
    created_at=datetime.utcnow(),
    updated_at=datetime.utcnow()
)

    project3 = Project(
        owner_id=alice.id,
        team_id=demo_team.id,
        name='Mobile Healthcare Application',
        due_date=datetime(2023, 10, 15),
        description='Creating a mobile healthcare application to track patient data.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project4 = Project(
        owner_id=bob.id,
        team_id=demo_team.id,
        name='Environment Monitoring IoT System',
        due_date=datetime(2023, 9, 1),
        description='Building an IoT system for environment monitoring.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project5 = Project(
        owner_id=user5.id,
        team_id=demo_team.id,
        name='E-commerce Website',
        due_date=datetime(2023, 8, 23),
        description='Designing an E-commerce website for handmade crafts.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project6 = Project(
        owner_id=user6.id,
        team_id=demo_team.id,
        name='Cloud-based Machine Learning Platform',
        due_date=datetime(2023, 7, 12),
        description='Developing a cloud-based platform for machine learning tasks.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project7 = Project(
        owner_id=user7.id,
        team_id=demo_team.id,
        name='Virtual Reality Gaming Engine',
        due_date=datetime(2023, 6, 29),
        description='Working on a virtual reality engine for next-gen gaming.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    project8 = Project(
        owner_id=user8.id,
        team_id=demo_team.id,
        name='Autonomous Vehicle Navigation System',
        due_date=datetime(2023, 5, 18),
        description='Developing an autonomous navigation system for vehicles.',
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
