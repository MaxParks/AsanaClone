from app.models import db, User, Task, Project, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_tasks():
    # Get our users and a project
    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bobbie = User.query.filter_by(email='bobbie@aa.io').first()
    demo_project = Project.query.filter_by(name='Demo Project').first()

    # Create some tasks
    task1 = Task(
        owner_id=demo.id,
        name='Task 1',
        description='This is task 1',
        assigned_to=marnie.id,
        due_date=datetime.now().date(),  # today's date
        completed=False,
        project_id=demo_project.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    task2 = Task(
        owner_id=marnie.id,
        name='Task 2',
        description='This is task 2',
        assigned_to=bobbie.id,
        due_date=datetime.now().date(),  # today's date
        completed=False,
        project_id=demo_project.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(task1)
    db.session.add(task2)

    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
