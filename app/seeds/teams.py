from app.models import db, Team


def seed_teams():

    teams = [
        {
            "name": "Press Your Pollock",
            "points": 36,
            "user_id": 1,
            "league_id": 1,
        },
        {
            "name": "I Maeda Mistake",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Yes We Kenley!",
            "points": 36,
            "user_id": 2,
            "league_id": 1,
        },
        {
            "name": "Joc Straps",
            "points": 32,
            "user_id": 3,
            "league_id": 1,
        },
        {
            "name": "Hell's Bellinger",
            "points": 31,
            "user_id": 4,
            "league_id": 1,
        },
        {
            "name": "Buehler's Day Off",
            "points": 20,
            "user_id": 5,
            "league_id": 1,
        },
        {
            "name": "I Did It All For The Mookie",
            "points": 25,
            "user_id": 6,
            "league_id": 1,
        },
        {
            "name": "Scherzer Thing",
            "points": 29,
            "user_id": 7,
            "league_id": 1,
        }

    ]

    for team in teams:
        t = Team(name=team["name"],
                 points=team["points"],
                 user_id=team["user_id"],
                 league_id=team["league_id"],
                 )
        db.session.add(t)
        db.session.commit()
