from flask.cli import AppGroup
from .users import seed_users, undo_users
from .teams import seed_teams, undo_teams
from .user_teams import seed_user_teams, undo_user_teams
from .projects import seed_projects, undo_projects
from .tasks import seed_tasks, undo_tasks
from .task_comments import seed_task_comments, undo_task_comments
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Undo seed commands before seeding in production
        undo_task_comments()
        undo_tasks()
        undo_projects()
        undo_user_teams()
        undo_teams()
        undo_users()
        undo_projects()

    seed_users()
    seed_teams()
    seed_user_teams()
    seed_projects()
    seed_tasks()
    seed_task_comments()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_task_comments()
    undo_tasks()
    undo_projects()
    undo_user_teams()
    undo_teams()
    undo_users()
