from flask import Blueprint, jsonify, json, request
from app.models import db, League

league_routes = Blueprint("league_routes",
                          __name__)

# ------------------------------------------------------------------------------
#                         League Operation Functions
# ------------------------------------------------------------------------------


def get_one_league(league_id):
    league = League.query.filter_by(id=league_id).first()
    return league


def get_all_leagues(user_id):

    leagues = League.query.filter_by(user_id=user_id).all()
    return json.dumps({"leagues": [league.to_dict() for league in
                                   leagues]}, default=str)


def add_league(user_id):
    league_data = json.loads(request.data.decode("utf-8"))

    league = League(name=league_data["name"],
                    type=league_data["type"],
                    permissions=league_data["permissions"],
                    draft=league_data["draft"],
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
@league_routes.route("/league", methods=['GET', 'POST'])
def get_or_add_leagues(user_id):
    if request.method == 'GET':
        return get_all_leagues(user_id)
    elif request.method == 'POST':
        return add_league(user_id)

# delete_league


@league_routes.route("/league/<int:league_id>", methods=['DELETE'])
def delete_user_league(user_id, league_id):
    return delete_league(league_id)

# # edit


# @league_routes.route("/leagues/<int:league_id>", methods=['PUT'])
# def edit_user_league(user_id, league_id):
#     return edit_league(league_id)
