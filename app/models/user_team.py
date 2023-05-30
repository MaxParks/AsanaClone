
from .db import db, environment, SCHEMA

class UserTeam(db.Model):
    __tablename__ = 'user_team'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f'users.id'), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey(f'teams.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('user_teams', cascade='all,delete'))
    team = db.relationship('Team', backref=db.backref('team_users', cascade='all,delete'))
