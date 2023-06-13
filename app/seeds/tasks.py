from app.models import db, User, Task, Project, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_tasks():
    # Get our users and a project
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bob = User.query.filter_by(email='bob@aa.io').first()
    alice = User.query.filter_by(email='alice@aa.io').first()
    user5 = User.query.filter_by(email='joe@aa.io').first()
    user6 = User.query.filter_by(email='steve@aa.io').first()
    user7 = User.query.filter_by(email='sheila@aa.io').first()
    user8 = User.query.filter_by(email='lacy@aa.io').first()

    project1 = Project.query.filter_by(name='Demo Project').first()
    project2 = Project.query.filter_by(name='Quantum Analysis Software').first()
    project3 = Project.query.filter_by(name='Mobile Healthcare Application').first()
    project4 = Project.query.filter_by(name='Environment Monitoring IoT System').first()
    project5 = Project.query.filter_by(name='E-commerce Website').first()
    project6 = Project.query.filter_by(name='Cloud-based Machine Learning Platform').first()
    project7 = Project.query.filter_by(name='Virtual Reality Gaming Engine').first()
    project8 = Project.query.filter_by(name='Autonomous Vehicle Navigation System').first()

    task1 = Task(
        owner_id=demo.id,
        name='Write Project Proposal',
        description='Complete the initial draft of the project proposal.',
        assigned_to=marnie.id,
        due_date=datetime.now().date(),
        completed=False,
        project_id=project1.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    task2 = Task(
        owner_id=marnie.id,
        name='Create Project Wireframes',
        description='Design wireframes for the project user interface.',
        assigned_to=demo.id,
        due_date=datetime.now().date(),
        completed=False,
        project_id=project2.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    task3 = Task(
        owner_id=alice.id,
        name='Set Up Database Schema',
        description='Design and implement the database schema.',
        assigned_to=bob.id,
        due_date=datetime.now().date(),
        completed=False,
        project_id=project3.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    task4 = Task(
        owner_id=bob.id,
        name='Design Frontend Layout',
        description='Create the frontend layout using CSS.',
        assigned_to=alice.id,
        due_date=datetime.now().date(),
        completed=False,
        project_id=project4.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    task5 = Task(
        owner_id=user5.id,
        name='Develop API Endpoints',
        description='Implement API endpoints for the backend.',
        assigned_to=user6.id,
        due_date=datetime.now().date(),
        completed=False,
        project_id=project5.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    task6 = Task(
        owner_id=user6.id,
        name='Implement User Authentication',
        description='Develop user authentication using JWT.',
        assigned_to=user5.id,
        due_date=datetime.now().date(),
        completed=False,
        project_id=project6.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    task7 = Task(
        owner_id=user7.id,
        name='Write Unit Tests',
        description='Create unit tests for the codebase.',
        assigned_to=user8.id,
        due_date=datetime.now().date(),
        completed=False,
        project_id=project7.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    task8 = Task(
        owner_id=user8.id,
        name='Setup Continuous Integration',
        description='Setup continuous integration for the project.',
        assigned_to=user7.id,
        due_date=datetime.now().date(),
        completed=False,
        project_id=project8.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )


    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)

    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
