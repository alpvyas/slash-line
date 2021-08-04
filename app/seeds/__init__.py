from app.seeds.profiles import seed_profiles
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .mlb_teams import seed_mlb_teams
from .player_users import seed_player_users
from .leagues import seed_leagues
from .teams import seed_teams
from .players import seed_players
from .stats import seed_player_stats
from .user_team_players import seed_team_players
from .profiles import seed_profiles

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_mlb_teams()
    seed_player_users()
    seed_leagues()
    seed_teams()
    seed_players()
    seed_player_stats()
    seed_team_players()
    seed_profiles()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
