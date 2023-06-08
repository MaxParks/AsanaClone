from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserTeam(db.Model):
    __tablename__ = 'user_team'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'))
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id'), ondelete='CASCADE'))

    user = db.relationship('User', back_populates='user_teams')
    team = db.relationship('Team', back_populates='members')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'team_id': self.team_id
        }
