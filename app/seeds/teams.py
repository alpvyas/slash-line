from app.models import db, Team


def seed_teams():

    teams = [
        {
            "name": "Press Your Pollock",
            "wins": 36,
            "losses": 27,
            "user_id": 1,
            "league_id": 1,
        },
        {
            "name": "I Maeda Mistake",
            "wins": 33,
            "losses": 30,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Yes We Kenley!",
            "wins": 36,
            "losses": 27,
            "user_id": 2,
            "league_id": 1,
        },
        {
            "name": "Joc Straps",
            "wins": 32,
            "losses": 31,
            "user_id": 3,
            "league_id": 1,
        },
        {
            "name": "Hell's Bellinger",
            "wins": 31,
            "losses": 32,
            "user_id": 4,
            "league_id": 1,
        },
        {
            "name": "Buehler's Day Off",
            "wins": 20,
            "losses": 43,
            "user_id": 5,
            "league_id": 1,
        },
        {
            "name": "I Did It All For The Mookie",
            "wins": 25,
            "losses": 38,
            "user_id": 6,
            "league_id": 1,
        },
        {
            "name": "Scherzer Thing",
            "wins": 29,
            "losses": 34,
            "user_id": 7,
            "league_id": 1,
        }

    ]

    for team in teams:
        t = Team(name=team["name"],
                 wins=team["wins"],
                 losses=team["losses"],
                 user_id=team["user_id"],
                 league_id=team["league_id"],
                 )
        db.session.add(t)
        db.session.commit()
