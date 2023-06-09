from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Project
from datetime import datetime

class ProjectForm(FlaskForm):
    team_id = IntegerField('team_id', validators=[DataRequired(message='Team is required.')])
    name = StringField('name', validators=[DataRequired(message='Name is required.')])
    due_date = StringField('due_date')
    description = StringField('description', validators=[DataRequired(message='Description is required.')])
