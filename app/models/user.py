from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .task import Task



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

    # relationships
    owned_teams = db.relationship('Team', back_populates='owner')
    user_teams = db.relationship('UserTeam', back_populates='user')
    owned_projects = db.relationship('Project', back_populates='owner')
    assigned_tasks = db.relationship('Task', foreign_keys=[Task.assigned_to], back_populates='assignee')
    owned_tasks = db.relationship('Task', foreign_keys=[Task.owner_id], back_populates='owner')
    comments = db.relationship('TaskComment', back_populates='user')

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
            'created_at': self.created_at.strftime('%m/%d/%Y'),
            'owned_teams': [team.to_dict() for team in self.owned_teams],
            'user_teams': [user_team.to_dict() for user_team in self.user_teams],
            'owned_projects': [project.to_dict() for project in self.owned_projects],
            'assigned_tasks': [task.to_dict() for task in self.assigned_tasks],
            'owned_tasks': [task.to_dict() for task in self.owned_tasks],
            'comments': [comment.to_dict() for comment in self.comments]
        }
