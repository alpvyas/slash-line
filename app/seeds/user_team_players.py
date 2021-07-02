from flask import Blueprint
from app.models import db, User_Team_Player


def seed_team_players():

    team_players = [

        {
            "mlb_player_id": "641355",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "621111",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "571970",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "596115",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "621020",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "664040",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "656305",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "457763",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "573262",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "547180",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "572041",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "543037",
            "team_id": 1,
            "status": "active",
        },
        {
            "mlb_player_id": "592626",
            "team_id": 1,
            "status": "injured",
        },
        {
            "mlb_player_id": "445276",
            "team_id": 1,
            "status": "injured",
        },
        {
            "mlb_player_id": "477132",
            "team_id": 1,
            "status": "injured",
        },
        {
            "mlb_player_id": "660670",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "518692",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "608331",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "592450",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "608336",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "518735",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "435559",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "665862",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "664761",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "596019",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "554340",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "554431",
            "team_id": 2,
            "status": "active",
        },
        {
            "mlb_player_id": "457705",
            "team_id": 2,
            "status": "injured",
        },
        {
            "mlb_player_id": "592885",
            "team_id": 2,
            "status": "injured",
        },
        {
            "mlb_player_id": "607680",
            "team_id": 2,
            "status": "injured",
        },
        {
            "mlb_player_id": "516782",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "645302",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "663457",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "666120",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "669622",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "452657",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "543510",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "553882",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "656555",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "572761",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "663586",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "500743",
            "team_id": 3,
            "status": "active",
        },
        {
            "mlb_player_id": "444482",
            "team_id": 3,
            "status": "injured",
        },
        {
            "mlb_player_id": "606132",
            "team_id": 3,
            "status": "injured",
        },
        {
            "mlb_player_id": "592663",
            "team_id": 3,
            "status": "injured",
        },
        {
            "mlb_player_id": "425877",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "543592",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "645261",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "571670",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "605151",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "519203",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "663905",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "446334",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "605113",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "656941",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "543105",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "640457",
            "team_id": 4,
            "status": "active",
        },
        {
            "mlb_player_id": "663837",
            "team_id": 4,
            "status": "injured",
        },
        {
            "mlb_player_id": "666137",
            "team_id": 4,
            "status": "injured",
        },
        {
            "mlb_player_id": "455119",
            "team_id": 4,
            "status": "injured",
        },
        {
            "mlb_player_id": "605540",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "656427",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "573009",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "465657",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "545358",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "572287",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "408234",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "543939",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "570482",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "602922",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "595777",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "668731",
            "team_id": 5,
            "status": "active",
        },
        {
            "mlb_player_id": "664023",
            "team_id": 5,
            "status": "injured",
        },
        {
            "mlb_player_id": "657077",
            "team_id": 5,
            "status": "injured",
        },
        {
            "mlb_player_id": "596146",
            "team_id": 5,
            "status": "injured",
        },
    ]

    for player in team_players:
        p = User_Team_Player(mlb_player_id=player["mlb_player_id"],
                             team_id=player["team_id"],
                             status=player["status"],
                             )
        db.session.add(p)
        db.session.commit()
