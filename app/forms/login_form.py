from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user or not user.check_password(password):
        raise ValidationError('Invalid credentials.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(message='Email is required.')])
    password = StringField('password', validators=[DataRequired(message='Password is required.'), password_matches])
