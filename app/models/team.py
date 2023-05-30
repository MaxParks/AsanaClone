
from .db import db, environment, SCHEMA
from datetime import datetime

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(f'users.id'))
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = db.relationship('User', backref='owned_teams', foreign_keys=[owner_id])
    members = db.relationship('UserTeam', backref='associated_team', cascade='all,delete')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'created_at': self.created_at.strftime('%m/%d/%Y'),
            'updated_at': self.updated_at.strftime('%m/%d/%Y')
        }
