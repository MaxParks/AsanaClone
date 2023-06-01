from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Project

project_routes = Blueprint('projects', __name__)
