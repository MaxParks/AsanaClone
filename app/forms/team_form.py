from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, Optional

class TeamsForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message='Name is required.')])
    members = TextAreaField('members', validators=[Optional(), Email(message='Invalid email address.')])
