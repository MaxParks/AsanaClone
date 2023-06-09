from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Project
from datetime import datetime

class TaskForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message='Name is required.')])
    description = StringField('description', validators=[DataRequired(message='Description is required.')])
    assigned_to = StringField('assigned_to', validators=[DataRequired(message='Assignee is required.')])
    due_date = StringField('due_date')
    project_id = IntegerField('project_id', validators=[DataRequired(message='Project is required.')])
