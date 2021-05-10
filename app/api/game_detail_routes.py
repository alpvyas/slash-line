from flask import Blueprint, jsonify, request
import requests
from app.models import db

game_detail_routes = Blueprint("game_detail_routes",
                               __name__)

# ------------------------------------------------------------------------------
#                         Game Details Operation Functions
# ------------------------------------------------------------------------------


def get_details(date):

    # response = requests.get(
    #     f"https://fly.sportsdata.io/v3/mlb/scores/json/GamesByDate/{date}", headers={'Ocp-Apim-Subscription-Key': '10502986f1944b58a416ba0d87ce4b5f'})

    url = "https://api-baseball.p.rapidapi.com/games"

    querystring = {"date": "2021-04-24"}

    headers = {
        'x-rapidapi-key': "47062ed2b6msh013afab20f9237fp1c52dbjsn61991d838413",
        'x-rapidapi-host': "api-baseball.p.rapidapi.com"
    }

    response = requests.request(
        "GET", url, headers=headers, params=querystring)

    data = response.text
    print("I'm inside the backend")
    print("THIS IS THE DATE PARAM: ", date)
    print("THIS IS THE NEW BACKEND RESPONSE: ", (data))
    print("THIS IS THE RESPONSE JSONIFIED: ", jsonify(data))
    return data


# ------------------------------------------------------------------------------
#                    RESTful Routes -- Game Details
# ------------------------------------------------------------------------------

@game_detail_routes.route("/date/<path:date>", methods=['GET'])
def get_game_details(date):
    return get_details(date)
