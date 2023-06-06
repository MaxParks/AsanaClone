from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Project
from datetime import datetime


def due_date_format(form, field):
    due_date = field.data
    if due_date and not due_date.strip():
        # Convert an empty string to None
        field.data = None
    elif due_date is not None:
        try:
            datetime.strptime(due_date, '%m/%d/%Y')
        except ValueError:
            raise ValidationError('Invalid due_date format. It should be in MM/DD/YYYY format')

class ProjectForm(FlaskForm):
    team_id = IntegerField('team_id', validators=[DataRequired(message='Team is required.')])
    name = StringField('name', validators=[DataRequired(message='Name is required.')])
    due_date = StringField('due_date', validators=[due_date_format])
    description = StringField('description', validators=[DataRequired(message='Description is required.')])
