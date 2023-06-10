from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User
from .user_team import UserTeam
from .project import Project

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    owner = db.relationship('User', back_populates='owned_teams')
    members = db.relationship('UserTeam', back_populates='team', cascade="all, delete-orphan")
    projects = db.relationship('Project', back_populates='team')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'created_at': self.created_at.strftime('%m/%d/%Y'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y'),
            'members': [member.id for member in self.members],
            'projects': [{
                'id': project.id,
                'name': project.name
            } for project in self.projects]
        }
