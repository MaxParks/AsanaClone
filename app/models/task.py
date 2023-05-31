from .db import db, environment, SCHEMA
from datetime import datetime

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(f'users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    assigned_to = db.Column(db.Integer, db.ForeignKey(f'users.id'))
    due_date = db.Column(db.Date)
    completed = db.Column(db.Boolean)
    project_id = db.Column(db.Integer, db.ForeignKey(f'projects.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    owner = db.relationship('User', foreign_keys=[owner_id], back_populates='owned_tasks')
    assignee = db.relationship('User', foreign_keys=[assigned_to], back_populates='assigned_tasks')
    project = db.relationship('Project', back_populates='tasks')
    comments = db.relationship('TaskComment', back_populates='task')

def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'assigned_to': self.assigned_to,
            'due_date': self.due_date,
            'completed': self.completed,
            'project_id': self.project_id,
            'created_at': self.created_at.strftime('%m/%d/%Y'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y')
        }
