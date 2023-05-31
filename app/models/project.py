from .db import db, environment, SCHEMA
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(f'users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey(f'teams.id'))
    name = db.Column(db.String, nullable=False)
    due_date = db.Column(db.Date)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    owner = db.relationship('User', back_populates='owned_projects')
    team = db.relationship('Team', back_populates='projects')
    tasks = db.relationship('Task', back_populates='project')


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'team_id': self.team_id,
            'name': self.name,
            'due_date': self.due_date,
            'description': self.description,
            'created_at': self.created_at.strftime('%m/%d/%Y'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y')
        }
