from flask import Blueprint, jsonify, json, request
from app.models import db, League, Team, User, User_Team_Player, Player

league_routes = Blueprint("league_routes",
                          __name__)

# ------------------------------------------------------------------------------
#                         League Operation Functions
# ------------------------------------------------------------------------------


def get_league_info(league_id, http=True):
    league = League.query.filter_by(id=int(league_id)).first()

    commissioner = User.query.filter_by(id=league.user_id).first()

    teams_list = Team.query.filter_by(league_id=league.id).all()

    teams = {}

    for team in teams_list:
        user = User.query.filter_by(id=team.user_id).first()

        team_players = User_Team_Player.query.filter_by(team_id=team.id).all()

        players = {}

        active_list = list(filter(
            lambda player: player.status == "active", team_players))
        active = [Player.query.filter_by(
            mlb_player_id=player.mlb_player_id).first() for player in active_list]
        active_without_none = list(
            filter(lambda player: player is not None, active))
        active = [player.to_dict() for player in active_without_none]
        players["active"] = active

        injured_list = list(filter(
            lambda player: player.status == "injured", team_players))
        injured = [Player.query.filter_by(
            mlb_player_id=player.mlb_player_id).first() for player in injured_list]
        injured_without_none = list(
            filter(lambda player: player is not None, injured))
        injured = [player.to_dict() for player in injured_without_none]
        players["injured"] = injured

        team_info = {}
        team_info["info"] = team.to_dict()
        team_info["user"] = user.to_dict()
        team_info["players"] = players

        teams[str(team.id)] = team_info

    league_details = {}
    league_details["info"] = league.to_dict()
    league_details["teams"] = teams
    league_details["commissioner"] = commissioner.to_dict()

    if http:
        return jsonify(league_details)
    else:
        return league_details


def get_user_leagues(user_id):

    teams = Team.query.filter_by(user_id=user_id).all()
    user_owned_leagues = League.query.filter_by(user_id=user_id).all()
    user_league_ids = [league.id for league in user_owned_leagues]

    league_ids = [team.league_id for team in teams]
    league_ids = [*league_ids, *user_league_ids]

    print("LEAGUE IDS: ", league_ids)

    leagues = {}

    for league in league_ids:
        league_info = get_league_info(league, False)

        leagues[str(league)] = league_info

    return jsonify(leagues)

    # managed = League.query.filter_by(user_id=user_id).all()

    # print("MANAGED: ", managed)
    # teams = Team.query.filter_by(user_id=user_id).all()
    # print("TEAMS: ", teams)
    # league_ids = [team.league_id for team in teams]
    # print("LEAGUE IDS: ", league_ids)

    # member = [League.query.filter_by(
    #     id=league).first() for league in league_ids]

    # member = [*member, *managed]

    # print("MEMBER: ", member)
    # return jsonify({"errors": "",
    #                 "managed": [league.to_dict() for league in
    #                             managed],
    #                 "member": [league.to_dict() for league in member]})


def add_new_league(user_id):
    league_data = json.loads(request.data.decode("utf-8"))

    league = League(name=league_data["name"],
                    type=league_data["type"],
                    permissions=league_data["permissions"],
                    draft_type=league_data["draft"],
                    draft_date=league_data["draft_date"],
                    draft_time=league_data["draft_time"],
                    user_id=league_data["user_id"])

    db.session.add(league)
    db.session.commit()
    return json.dumps(league.to_dict(), default=str)


def delete_league(league_id):
    league = League.query.filter_by(id=league_id).first()

    db.session.delete(league)
    db.session.commit()
    return jsonify({"message": "League successfully deleted"})


def join_league(league_id, passcode):
    # league_credentials = json.loads(request.data.decode("utf-8"))

    # print("LEAGUE CREDS: ", league_credentials)

    league = League.query.filter_by(
        id=int(league_id)).first()

    if league:
        league_passcode = league.passcode

        if league_passcode == passcode:
            return jsonify({"ok": "ok", "errors": ""})

    return jsonify({"ok": "", "errors": "That info doesn't seem to work. Check your inputs and try again."})


def get_open_leagues():
    leagues = League.query.filter_by(public=1).all()

    return jsonify([league.to_dict() for league in leagues])


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
#                    RESTful Routes -- Leagues
# ------------------------------------------------------------------------------

# get_all
# add_league
@league_routes.route("/user/<int:user_id>", methods=['GET', 'POST'])
def get_or_add_leagues(user_id):
    if request.method == 'GET':
        return get_user_leagues(user_id)
    elif request.method == 'POST':
        return add_new_league(user_id)


# join
@league_routes.route("/<int:league_id>/join/<int:passcode>", methods=['GET'])
def join_new_league(league_id, passcode):
    return join_league(league_id, passcode)


# get open leagues
@league_routes.route("/open", methods=['GET'])
def get_leagues():
    return get_open_leagues()


# delete a league or get info re league
@league_routes.route("/<int:league_id>", methods=['GET', 'DELETE'])
def league_info(league_id):
    if request.method == 'GET':
        return get_league_info(league_id)
    elif request.method == 'DELETE':
        return delete_league(league_id)

# # edit


# @league_routes.route("/leagues/<int:league_id>", methods=['PUT'])
# def edit_user_league(user_id, league_id):
#     return edit_league(league_id)
