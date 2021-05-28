from flask import Blueprint, jsonify, json, request
from app.models import db, Team, User_Team_Player

team_routes = Blueprint("team_routes",
                        __name__)

# ------------------------------------------------------------------------------
#                         Team Operation Functions
# ------------------------------------------------------------------------------


def get_league_teams(id):
    teams = Team.query.filter_by(league_id=id).all()

    return json.dumps({"teams": [team.to_dict() for team in
                                 teams]}, default=str)


def add_team(user_id, league_id):
    team_data = json.loads(request.data.decode("utf-8"))

    team = Team(name=team_data["name"],
                wins=team_data["wins"],
                losses=team_data["losses"],
                user_id=team_data["user_id"],
                league_id=team_data["league_id"])

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
        league_id=league_id).filter_by(user_id=user_id)

    roster = User_Team_Player.query.filter_by(team_id=user_team.id)

    players = [player_id for player_id in roster]

    for player in players:
        if player == player_id:
            return jsonify({"ok": False, "message": "Player already on roster."})

    new_player = User_Team_Player(player_id=player_id,
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


@team_routes.route("/teams", methods=['GET', 'POST'])
def get_or_add_teams(league_id):
    if request.method == 'GET':
        return get_league_teams(league_id)
    elif request.method == 'POST':
        return add_team(league_id)


@team_routes.route("team/<int:user_id>", methods=['GET', 'POST'])
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
