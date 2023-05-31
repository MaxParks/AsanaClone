from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class TaskComment(db.Model):
    __tablename__ = 'task_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='comments')
    task = db.relationship('Task', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'task_id': self.task_id,
            'comment': self.comment,
            'created_at': self.created_at.strftime('%m/%d/%Y %H:%M:%S')
        }
