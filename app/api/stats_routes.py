from flask import Blueprint, jsonify, request
import requests
from app.models import db

stats_routes = Blueprint("stats_routes",
                         __name__)

# ------------------------------------------------------------------------------
#                         Stats Operation Functions
# ------------------------------------------------------------------------------


def get_player_stats(game_type, season, player_id):

    response = requests.get(
        f"http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='{game_type}'&season='{season}'&player_id='{player_id}'")
    data = response.text
    # print("I'm inside the backend")
    # print("THIS IS THE NEW BACKEND RESPONSE: ", (data))
    # print("THIS IS THE RESPONSE JSONIFIED: ", jsonify(data))
    return data


# ------------------------------------------------------------------------------
#                    RESTful Routes -- Stats
# ------------------------------------------------------------------------------

@stats_routes.route("/game_type/<string:game_type>/season/<int:season>/players/<int:player_id>", methods=['POST'])
def update_players(players):
    return add_players(players)


@stats_routes.route("/game_type/<string:game_type>/season/<int:season>/players/<int:player_id>", methods=['GET'])
def get_stats(game_type, season, player_id):
    return get_player_stats(game_type, season, player_id)
