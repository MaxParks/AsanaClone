from app.models import db, User, Task, TaskComment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_task_comments():

    demo = User.query.filter_by(email='demo@aa.io').first()
    marnie = User.query.filter_by(email='marnie@aa.io').first()
    task1 = Task.query.filter_by(name='Task 1').first()

    # Create some comments
    comment1 = TaskComment(
        user_id=demo.id,
        task_id=task1.id,
        comment='This is a comment from demo',
        created_at=datetime.utcnow()
    )

    comment2 = TaskComment(
        user_id=marnie.id,
        task_id=task1.id,
        comment='This is a comment from Marnie',
        created_at=datetime.utcnow()
    )

    db.session.add(comment1)
    db.session.add(comment2)

    db.session.commit()

def undo_task_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.task_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM task_comments"))

    db.session.commit()
