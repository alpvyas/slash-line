from flask import Blueprint, jsonify, request, json, session
from datetime import date
import requests
from app.models import db, Player, Player_Stats

stats_routes = Blueprint("stats_routes",
                         __name__)

# ------------------------------------------------------------------------------
#                         Stats Operation Functions
# ------------------------------------------------------------------------------


def get_player_stats():
    print("HELLO")
    game_type = "R"
    today = date.today()
    year = today.year

    players = [player.mlb_player_id for player in Player.query.all()]

    print("PLAYERS: ", players)

    for player in players:
        response = requests.get(
            f"http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='{game_type}'&season='{year}'&player_id='{player}'")

        data = json.loads(response.text)

        stats_data = data["sport_hitting_tm"]["queryResults"]["row"]

        stats = Player_Stats(ab=stats_data["ab"],
                             ao=stats_data["ao"],
                             avg=stats_data["avg"],
                             babip=stats_data["babip"],
                             bb=stats_data["bb"],
                             )

        db.session.add(stats)
        db.session.commit()

    # print("I'm inside the backend")
    # print("THIS IS THE NEW BACKEND RESPONSE: ", (data))
    # print("THIS IS THE RESPONSE JSONIFIED: ", jsonify(data))
    return "hello"  # data


# ------------------------------------------------------------------------------
#                    RESTful Routes -- Stats
# ------------------------------------------------------------------------------

@stats_routes.route("/game_type/<string:game_type>/season/<int:season>/players/<int:player_id>", methods=['POST'])
def update_players(players):
    return add_players(players)


@stats_routes.route("/", methods=['GET'])
def get_stats():
    return get_player_stats()
