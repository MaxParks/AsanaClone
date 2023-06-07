from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo',
        lastName='User',
        email='demo@aa.io',
        password='password',
        created_at=datetime.utcnow()
    )

    marnie = User(
        firstName='Marnie',
        lastName='User',
        email='marnie@aa.io',
        password='password',
        created_at=datetime.utcnow()
    )

    alice = User(
        firstName='Alice',
        lastName='User',
        email='alice@aa.io',
        password='password',
        created_at=datetime.utcnow()
    )

    bob = User(
        firstName='Bob',
        lastName='User',
        email='bob@aa.io',
        password='password',
        created_at=datetime.utcnow()
    )

    user5 = User(
        firstName='User5',
        lastName='User',
        email='user5@aa.io',
        password='password',
        created_at=datetime.utcnow()
    )

    user6 = User(
        firstName='User6',
        lastName='User',
        email='user6@aa.io',
        password='password',
        created_at=datetime.utcnow()
    )

    user7 = User(
        firstName='User7',
        lastName='User',
        email='user7@aa.io',
        password='password',
        created_at=datetime.utcnow()
    )

    user8 = User(
        firstName='User8',
        lastName='User',
        email='user8@aa.io',
        password='password',
        created_at=datetime.utcnow()
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(alice)
    db.session.add(bob)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
