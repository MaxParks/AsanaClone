
from .db import db, environment, SCHEMA
from datetime import datetime

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(f'users.id'))
    team_id = db.Column(db.Integer, db.ForeignKey(f'teams.id'))
    name = db.Column(db.String, nullable=False,)
    due_date = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = db.relationship('User', back_populates='owned_projects', foreign_keys=[owner_id])
    team = db.relationship('Team', back_populates='assigned_projects', foreign_keys=[team_id])


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'team_id': self.team_id,
            'name': self.name,
            'due_date': self.due_date.strftime('%m/%d/%Y'),
            'description': self.description,
            'created_at': self.created_at.strftime('%m/%d/%Y'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y')
        }
