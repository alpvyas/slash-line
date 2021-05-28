from flask import Blueprint, jsonify, request
import requests
from app.models import db
import os

game_detail_routes = Blueprint("game_detail_routes",
                               __name__)

# ------------------------------------------------------------------------------
#                         Game Details Operation Functions
# ------------------------------------------------------------------------------


def game_details(date):

    # url = "https://api-baseball.p.rapidapi.com/games"
    # rapid_api_key = os.environ.get('X_RAPIDAPI_KEY')
    # querystring = {"date": "2021-04-24"}

    # headers = {
    #     'x-rapidapi-key': rapid_api_key,
    #     'x-rapidapi-host': "api-baseball.p.rapidapi.com"
    # }

    sports_data_api_key = os.environ.get('OCP_APIM_SUBSCRIPTION_KEY')

    url = f"https://fly.sportsdata.io/v3/mlb/scores/json/GamesByDate/{date}"

    headers = {'Ocp-Apim-Subscription-Key': sports_data_api_key}

    response = requests.request(
        "GET", url, headers=headers)

    data = response.text

    return data


# ------------------------------------------------------------------------------
#                    RESTful Routes -- Game Details
# ------------------------------------------------------------------------------

@game_detail_routes.route("/date/<path:date>", methods=['GET'])
def get_game_details(date):
    return game_details(date)
