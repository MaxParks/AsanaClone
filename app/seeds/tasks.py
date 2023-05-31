from app.models import db, Task
from random import randint, choice
from datetime import datetime, timedelta

def seed_tasks():
    users_count = db.session.execute('SELECT COUNT(*) FROM users;').scalar()

    for _ in range(10):  # Create 10 tasks
        task = Task(
            owner_id=randint(1, users_count),
            name=f"Task {_}",
            description=f"Description for Task {_}",
            assigned_to=randint(1, users_count),
            due_date=datetime.now() + timedelta(days=randint(1, 30)),
            completed=bool(randint(0, 1)),
            project_id=randint(1, 2),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.session.add(task)

    db.session.commit()


def undo_tasks():
    db.session.execute('DELETE FROM tasks;')
    db.session.commit()
