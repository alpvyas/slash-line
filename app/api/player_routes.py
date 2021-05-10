from flask import Blueprint, jsonify, request
import requests
from app.models import db

player_routes = Blueprint("player_routes",
                          __name__)

# ------------------------------------------------------------------------------
#                         Player Operation Functions
# ------------------------------------------------------------------------------


def add_players(players):

    print("I'm inside the backend")
    print("THIS IS PLAYERS: ", players)
# ------------------------------------------------------------------------------
#                    RESTful Routes -- Players
# ------------------------------------------------------------------------------


@player_routes.route("/", methods=['POST'])
def update_players(players):
    return add_players(players)
