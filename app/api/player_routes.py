from flask import Blueprint, jsonify, request, json
import requests
from app.models import db, Player

player_routes = Blueprint("player_routes",
                          __name__)

# ------------------------------------------------------------------------------
#                         Player Operation Functions
# ------------------------------------------------------------------------------
teams = [108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
         118, 119, 120, 121, 133, 134, 135, 136, 137, 138,
         139, 140, 141, 142, 143, 144, 145, 146, 147, 158]


def add_players():
    players = json.loads(request.data.decode("utf-8"))
    print("PLAYERS LENGTH: ", len(players))
    for player_data in players:
        player_id = player_data["player_id"]
        response = requests.get(
            f"http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='{player_id}'")

        data = json.loads(response.text)

        player_info = data["player_info"]["queryResults"]["row"]

        # print("DATA: ", data, " END DATA")

        # print("PLAYER_INFO TYPE: ", type(player_info), " END TYPE")

        # print("PLAYER_INFO: ", player_info, " END PLAYER_INFO")

        player = Player(first_name=player_info["name_use"],
                        last_name=player_info["name_last"],
                        age=player_info["age"],
                        bats=player_info["bats"],
                        birth_date=player_info["birth_date"],
                        height_feet=player_info["height_feet"],
                        height_inches=player_info["height_inches"],
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
    # print("I'm inside the backend")
    # print("THIS IS PLAYERS: ", player_data)

    return "pass"
# ------------------------------------------------------------------------------
#                    RESTful Routes -- Players
# ------------------------------------------------------------------------------


@player_routes.route("/", methods=['POST'])
def update_players():
    return add_players()
