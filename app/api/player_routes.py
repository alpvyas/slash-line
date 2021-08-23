from flask import Blueprint, jsonify, request, json, session
import requests
from app.models import db, Player

player_routes = Blueprint("player_routes",
                          __name__)

# ------------------------------------------------------------------------------
#                         Player Operation Functions
# ------------------------------------------------------------------------------


def add_players():
    players = json.loads(request.data.decode("utf-8"))

    d = Player.query.all()
    for player in d:
        db.session.delete(player)
        db.session.commit()

    for player_data in players:
        player_id = player_data["player_id"]

        response = requests.get(
            f"http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='{player_id}'")

        data = json.loads(response.text)

        player_info = data["player_info"]["queryResults"]["row"]

        player = Player(first_name=player_info["name_use"],
                        last_name=player_info["name_last"],
                        full_name=player_info["name_display_first_last_html"],
                        age=player_info["age"],
                        bats=player_info["bats"],
                        birth_date=player_info["birth_date"],
                        height_feet=player_info["height_feet"],
                        height_inches=player_info["height_inches"],
                        height=player_info["height_feet"] +
                        "'" + player_info["height_inches"],
                        jersey_number=player_info["jersey_number"],
                        mlb_player_id=player_info["player_id"],
                        mlb_team_name=player_info["team_name"],
                        nick_name=player_info["name_nick"],
                        primary_position=player_info["primary_position"],
                        primary_position_txt=player_info["primary_position_txt"],
                        primary_stat_type=player_info["primary_stat_type"],
                        status=player_info["status"],
                        team_abbrev=player_info["team_abbrev"],
                        throws=player_info["throws"],
                        weight=player_info["weight"])

        db.session.add(player)
        db.session.commit()

    return jsonify({"message": "Players successfully updated."})


def get_players():

    players = Player.query.all()

    return jsonify({"players": [player.to_dict() for player in players],
                    "message": "Retrieved players successfully."})


def get_single_player(player_id):

    player = Player.query.filter_by(mlb_player_id=player_id).first()

    return jsonify(player.to_dict())

# ------------------------------------------------------------------------------
#                    RESTful Routes -- Players
# ------------------------------------------------------------------------------


@player_routes.route("/", methods=['GET'])
def get_players_from_db():
    return get_players()


@player_routes.route("/<string:player_id>")
def get_player(player_id):
    return get_single_player(player_id)


@player_routes.route("/", methods=['POST'])
def update_players():
    return add_players()
