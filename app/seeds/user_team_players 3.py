from flask import Blueprint
from app.models import db, Player


def seed_team_players():

    team_players = [

        {
            "mlb_player_id": "641355",
            "team_id": 1,
        },
        {
            "mlb_player_id": "621111",
            "team_id": 1,
        },
        {
            "mlb_player_id": "571970",
            "team_id": 1,
        },
        {
            "mlb_player_id": "596115",
            "team_id": 1,
        },
        {
            "mlb_player_id": "621020",
            "team_id": 1,
        },
        {
            "mlb_player_id": "664040",
            "team_id": 1,
        },
        {
            "mlb_player_id": "656305",
            "team_id": 1,
        },
        {
            "mlb_player_id": "457763",
            "team_id": 1,
        },
        {
            "mlb_player_id": "573262",
            "team_id": 1,
        },
        {
            "mlb_player_id": "547180",
            "team_id": 1,
        },
        {
            "mlb_player_id": "572041",
            "team_id": 1,
        },
        {
            "mlb_player_id": "543037",
            "team_id": 1,
        },
        {
            "mlb_player_id": "592626",
            "team_id": 1,
        },
        {
            "mlb_player_id": "445276",
            "team_id": 1,
        },
        {
            "mlb_player_id": "477132",
            "team_id": 1,
        },
        {
            "mlb_player_id": "660670",
            "team_id": 2,
        },
        {
            "mlb_player_id": "518692",
            "team_id": 2,
        },
        {
            "mlb_player_id": "608331",
            "team_id": 2,
        },
        {
            "mlb_player_id": "592450",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
        {
            "mlb_player_id": "",
            "team_id": 2,
        },
    ]


for team in teams:
    t = Team(name=team["name"],
             points=team["points"],
             user_id=team["user_id"],
             league_id=team["league_id"],
             )
    db.session.add(t)
    db.session.commit()
