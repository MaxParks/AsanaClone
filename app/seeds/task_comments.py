from app.models import db, User, Task, TaskComment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_task_comments():

    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    bob = User.query.filter_by(email='bob@aa.io').first()
    alice = User.query.filter_by(email='alice@aa.io').first()
    user5 = User.query.filter_by(email='user5@aa.io').first()
    user6 = User.query.filter_by(email='user6@aa.io').first()
    user7 = User.query.filter_by(email='user7@aa.io').first()
    user8 = User.query.filter_by(email='user8@aa.io').first()

    task1 = Task.query.filter_by(name='Task 1').first()
    task2 = Task.query.filter_by(name='Task 2').first()
    task3 = Task.query.filter_by(name='Task 3').first()
    task4 = Task.query.filter_by(name='Task 4').first()
    task5 = Task.query.filter_by(name='Task 5').first()
    task6 = Task.query.filter_by(name='Task 6').first()
    task7 = Task.query.filter_by(name='Task 7').first()
    task8 = Task.query.filter_by(name='Task 8').first()


    # Create some comment
    comment1 = TaskComment(
        user_id=demo.id,
        task_id=task1.id,
        comment='This is a comment from demo',
        created_at=datetime.utcnow()
    )

    comment2 = TaskComment(
        user_id=marnie.id,
        task_id=task2.id,
        comment='This is a comment from Marnie',
        created_at=datetime.utcnow()
    )

    comment3 = TaskComment(
        user_id=alice.id,
        task_id=task3.id,
        comment='This is a comment from Alice',
        created_at=datetime.utcnow()
    )

    comment4 = TaskComment(
        user_id=bob.id,
        task_id=task4.id,
        comment='This is a comment from Bob',
        created_at=datetime.utcnow()
    )

    comment5 = TaskComment(
        user_id=user5.id,
        task_id=task5.id,
        comment='This is a comment from User5',
        created_at=datetime.utcnow()
    )

    comment6 = TaskComment(
        user_id=user6.id,
        task_id=task6.id,
        comment='This is a comment from User6',
        created_at=datetime.utcnow()
    )

    comment7 = TaskComment(
        user_id=user7.id,
        task_id=task7.id,
        comment='This is a comment from User7',
        created_at=datetime.utcnow()
    )

    comment8 = TaskComment(
        user_id=user8.id,
        task_id=task8.id,
        comment='This is a comment from User8',
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
