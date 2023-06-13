from app.models import db, User, Task, TaskComment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_task_comments():

    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bob = User.query.filter_by(email='bob@aa.io').first()
    alice = User.query.filter_by(email='alice@aa.io').first()
    user5 = User.query.filter_by(email='joe@aa.io').first()
    user6 = User.query.filter_by(email='steve@aa.io').first()
    user7 = User.query.filter_by(email='sheila@aa.io').first()
    user8 = User.query.filter_by(email='lacy@aa.io').first()

    task1 = Task.query.filter_by(name='Write Project Proposal').first()
    task2 = Task.query.filter_by(name='Create Project Wireframes').first()
    task3 = Task.query.filter_by(name='Set Up Database Schema').first()
    task4 = Task.query.filter_by(name='Design Frontend Layout').first()
    task5 = Task.query.filter_by(name='Develop API Endpoints').first()
    task6 = Task.query.filter_by(name='Implement User Authentication').first()
    task7 = Task.query.filter_by(name='Write Unit Tests').first()
    task8 = Task.query.filter_by(name='Setup Continuous Integration').first()


    # Create some comment
    comment1 = TaskComment(
        user_id=demo.id,
        task_id=task1.id,
        comment='Just completed the outline for the project proposal. Will start on the draft soon.',
        created_at=datetime.utcnow()
    )

    comment2 = TaskComment(
        user_id=marnie.id,
        task_id=task2.id,
        comment='Initial wireframes have been completed. Review and let me know your thoughts.',
        created_at=datetime.utcnow()
    )

    comment3 = TaskComment(
        user_id=alice.id,
        task_id=task3.id,
        comment='Database schema has been created. Working on migrations now.',
        created_at=datetime.utcnow()
    )

    comment4 = TaskComment(
        user_id=bob.id,
        task_id=task4.id,
        comment='Frontend layout is complete. Moving on to functionality.',
        created_at=datetime.utcnow()
    )

    comment5 = TaskComment(
        user_id=user5.id,
        task_id=task5.id,
        comment='API endpoints have been developed. Documentation is in progress.',
        created_at=datetime.utcnow()
    )

    comment6 = TaskComment(
        user_id=user6.id,
        task_id=task6.id,
        comment='User authentication is up and running. Moving on to role-based permissions.',
        created_at=datetime.utcnow()
    )

    comment7 = TaskComment(
        user_id=user7.id,
        task_id=task7.id,
        comment='Unit tests are completed for models. Starting with controllers now.',
        created_at=datetime.utcnow()
    )

    comment8 = TaskComment(
        user_id=user8.id,
        task_id=task8.id,
        comment='Continuous integration setup is complete. The pipeline is working as expected.',
        created_at=datetime.utcnow()
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)

    db.session.commit()

def undo_task_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.task_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM task_comments"))

    db.session.commit()
