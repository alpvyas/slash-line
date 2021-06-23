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
        },
        {
            "name": "Ryu Jays",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "The Bryce is Right",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "The Bichette is Back",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Acuña Matata",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "RBI'd for Her Pleasure",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Dansby Swansong",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Wriggly Feels",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Lester We Forget",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "The Life of Bryant",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Ring My Bellinger",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Brooklyn Trolley Dodgers",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Joc Itch",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "I Like Big Betts",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "All Betts Are Off",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Babe Ruthless",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Angels in the Troutfield",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Maybe This Year",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Honey Nut Ichiros",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Bryce Krispies",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Eggs Odorizzi",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Rally Monkeys",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Southside Southpaws",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Madbum",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "The Balking Dead",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Lil Sebastian's Favorite Team",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Men of Steal",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Lovable Losers",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Working the Count",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Stroman Troopers",
            "points": 33,
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "A Puig of Their Own",
            "points": 33,
            "user_id": 9,
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
