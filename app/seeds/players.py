from flask import Blueprint, jsonify, request, json, session
from app.models import db, Player
import requests

teams = [144, 146, 121, 143, 120, 112, 113, 158, 134, 138, 109, 115, 119, 135,
         137, 110, 111, 147, 139, 141, 145, 114, 116, 118, 142, 117, 108, 133, 136, 140]


def seed_players():

    players = []

    for team in teams:
        response = requests.get(
            f"http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='{team}'"
        )
        data = json.loads(response.text)
        roster = data["roster_40"]["queryResults"]["row"]
        players = [*players, *roster]

    for player in players:
        player_id = player["player_id"]

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
