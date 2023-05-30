from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    owned_projects = db.relationship('Project', back_populates='owner', lazy=True)
    owned_tasks = db.relationship('Task', back_populates='owner', lazy=True)
    assigned_tasks = db.relationship('Task', back_populates='assignee', lazy=True)
    owned_teams = db.relationship('Team', back_populates='owner', lazy=True)
    teams = db.relationship(
        'Team',
        secondary='user_team',
        back_populates='users',
        lazy='subquery'
    )
    comments = db.relationship('TaskComment', back_populates='user', lazy=True)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'created_at': self.created_at.strftime('%m/%d/%Y')
        }