from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    assigned_to = db.Column(db.Integer, db.ForeignKey('users.id'))
    due_date = db.Column(db.Date)
    completed = db.Column(db.Boolean)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    
 # Relationships
    owner = db.relationship('User', back_populates='owned_tasks')
    assignee = db.relationship('User', back_populates='assigned_tasks')
    project = db.relationship('Project', back_populates='tasks')
    comments = db.relationship('TaskComment', back_populates='task', lazy=True)


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'assigned_to': self.assigned_to,
            'due_date': self.due_date.strftime('%m/%d/%Y') if self.due_date else None,
            'completed': self.completed,
            'project_id': self.project_id,
            'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y %H:%M:%S')
        }
