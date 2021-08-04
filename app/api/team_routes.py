from flask import Blueprint, jsonify, json, request
from app.models import db, Team, User_Team_Player, Player

team_routes = Blueprint("team_routes",
                        __name__)

# ------------------------------------------------------------------------------
#                         Team Operation Functions
# ------------------------------------------------------------------------------


def get_league_teams(id):
    teams = Team.query.filter_by(league_id=id).all()

    return json.dumps({"teams": [team.to_dict() for team in
                                 teams]}, default=str)


def get_user_players(user_id):
    user_team = Team.query.filter_by(user_id=user_id).all()
    roster = []
    teams = {}

    print("USER TEAM: ", user_team)

    for team in user_team:
        team_players = User_Team_Player.query.filter_by(team_id=team.id).all()
        roster = [*roster, *team_players]

        players = {}

        print("TEAM PLAYERS: ", team_players)

        active_list = list(filter(
            lambda player: player.status == "active", team_players))
        print("ACTIVE LIST: ", active_list)
        active = [Player.query.filter_by(
            mlb_player_id=player.mlb_player_id).first() for player in active_list]
        activeWithoutNone = list(
            filter(lambda player: player is not None, active))
        active = [player.to_dict() for player in activeWithoutNone]
        print("ACTIVE: ", active)
        players["active"] = active

        injured_list = list(filter(
            lambda player: player.status == "injured", team_players))
        print("INJURED LIST: ", injured_list)
        injured = [Player.query.filter_by(
            mlb_player_id=player.mlb_player_id).first() for player in injured_list]
        injuredWithoutNone = list(
            filter(lambda player: player is not None, injured))
        injured = [player.to_dict() for player in injuredWithoutNone]
        print("INJURED: ", injured)
        players["injured"] = injured

        team_obj = {}
        team_obj["info"] = team.to_dict()
        team_obj["players"] = players

        teams[str(team.league_id)] = team_obj

    all_players = [Player.query.filter_by(
        mlb_player_id=player.mlb_player_id).first() for player in roster]

    if teams:
        return jsonify({"ok": True, "message": "User Team successfully retrieved.", "teams": teams})
    else:
        return jsonify({"ok": False, "message": "Failed to retrieve user team. Please try again."})


def add_team():
    team_data = request.json

    team = Team(name=team_data["name"],
                # colors=team_data["colors"],
                user_id=team_data["userID"],
                league_id=team_data["leagueID"])

    db.session.add(team)
    db.session.commit()
    return json.dumps(team.to_dict(), default=str)


def delete_team(team_id, user_id):
    team = Team.query.filter_by(user_id=user_id).filter_by(id=team_id).first()

    db.session.delete(team)
    db.session.commit()
    return jsonify({"message": "Team successfully deleted"})


def add_player_to_team(league_id, user_id):
    player_id = json.loads(request.data.decode("utf-8"))
    user_team = Team.query.filter_by(
        league_id=league_id).filter_by(user_id=user_id).first()

    roster = User_Team_Player.query.filter_by(team_id=user_team.id).all()

    players = [int(player.mlb_player_id) for player in roster]

    for player in players:
        if player == player_id:
            return jsonify({"ok": False, "message": "Player already on roster."})

    league_teams = Team.query.filter_by(league_id=league_id).all()

    print("LEAGUE TEAMS: ", league_teams)
    league_players = []

    for league_team in league_teams:
        roster = User_Team_Player.query.filter_by(
            team_id=league_team.id).all()

        players = [int(player.mlb_player_id) for player in roster]

        league_players = [*league_players, *players]

    for player in league_players:
        if player == player_id:
            return jsonify({"ok": False, "message": "Player is already on another team in the league."})

    new_player = User_Team_Player(mlb_player_id=player_id,
                                  team_id=user_team.id)

    db.session.add(new_player)
    db.session.commit()
    return jsonify({"ok": True, "message": "Player successfully added to roster."})

# def edit_league(league_id):
#     league_data = json.loads(request.data.decode("utf-8"))
#     league = get_one_league(league_id)

#     if league.name is not league_data["name"]:
#         league.name = league_data["name"]
#     if league.user_id is not league_data["user_id"]:
#         league.user_id = league_data["user_id"]

#     db.session.commit()
#     return jsonify(league.to_dict())

# ------------------------------------------------------------------------------
#                    RESTful Routes -- Teams
# ------------------------------------------------------------------------------

# get_all
# add_team


@team_routes.route("/", methods=['GET', 'POST'])
def get_or_add_teams(league_id):
    if request.method == 'GET':
        return get_league_teams(league_id)
    elif request.method == 'POST':
        return add_team()


@team_routes.route("/users/<int:user_id>", methods=['GET'])
def get_all_user_players(user_id):
    return get_user_players(user_id)


@team_routes.route("leagues/<int:league_id>/users/<int:user_id>", methods=['GET', 'POST'])
def get_or_add_user_team(league_id, user_id):
    if request.method == 'GET':
        return get_user_team(league_id, user_id)
    elif request.method == 'POST':
        return add_player_to_team(league_id, user_id)
# delete_team


# @team_routes.route("/league/<int:league_id>", methods=['DELETE'])
# def delete_user_league(user_id, league_id):
#     return delete_league(league_id)

# # edit


# @league_routes.route("/leagues/<int:league_id>", methods=['PUT'])
# def edit_user_league(user_id, league_id):
#     return edit_league(league_id)
