from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Project
from datetime import datetime


def due_date_format(form, field):
    due_date = field.data
    if due_date and not due_date.strip():
        field.data = None
    elif due_date is not None:
        try:
            datetime.strptime(due_date, '%m/%d/%Y')
        except ValueError:
            raise ValidationError('Invalid due_date format. It should be in MM/DD/YYYY format')

class TaskForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message='Name is required.')])
    description = StringField('description', validators=[DataRequired(message='Description is required.')])
    assigned_to = StringField('assigned_to', validators=[DataRequired(message='Assignee is required.')])
    due_date = StringField('due_date', validators=[due_date_format])
    project_id = IntegerField('project_id', validators=[DataRequired(message='Project is required.')])
