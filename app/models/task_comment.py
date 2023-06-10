from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class TaskComment(db.Model):
    __tablename__ = 'task_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id')), nullable=False)
    comment = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user = db.relationship('User', back_populates='comments')
    task = db.relationship('Task', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'created_at': self.created_at.strftime('%m/%d/%Y'),
            'user': {
                'first_name': self.user.firstName,
                'last_name': self.user.lastName
            }
        }
