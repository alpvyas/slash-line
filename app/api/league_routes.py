from flask import Blueprint, jsonify, json, request
from app.models import db, League, Team

league_routes = Blueprint("league_routes",
                          __name__)

# ------------------------------------------------------------------------------
#                         League Operation Functions
# ------------------------------------------------------------------------------


def get_one_league(league_id):
    league = League.query.filter_by(id=league_id).first()
    return league


def get_user_leagues(user_id):

    managed = League.query.filter_by(user_id=user_id).all()

    # print("MANAGED: ", managed)
    teams = Team.query.filter_by(user_id=user_id).all()
    # print("TEAMS: ", teams)
    league_ids = [team.league_id for team in teams]
    print("LEAGUE IDS: ", league_ids)

    member = [League.query.filter_by(
        id=league).first() for league in league_ids]

    # member = [*member, *managed]

    # print("MEMBER: ", member)
    return jsonify({"errors": "",
                    "managed": [league.to_dict() for league in
                                managed],
                    "member": [league.to_dict() for league in member]})


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


def join_user_league():
    league_credentials = json.loads(request.data.decode("utf-8"))

    print("LEAGUE CREDS: ", league_credentials)

    league = League.query.filter_by(
        id=int(league_credentials["leagueId"])).first()

    # if league:
    # league_passcode = league.passcode

    # if league_passcode == league_credentials["passcode"]:
    # return jsonify({"ok": True})
    return jsonify({"ok": "true"})


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
@league_routes.route("/join", methods=['PUT'])
def join_league():
    return join_user_league()


# delete
@league_routes.route("/league/<int:league_id>", methods=['DELETE'])
def delete_user_league(user_id, league_id):
    return delete_league(league_id)

# # edit


# @league_routes.route("/leagues/<int:league_id>", methods=['PUT'])
# def edit_user_league(user_id, league_id):
#     return edit_league(league_id)
