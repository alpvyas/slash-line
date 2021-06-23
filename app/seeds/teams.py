from app.models import db, Team
from random import randint


def points():
    return randint(25, 200)


def seed_teams():

    teams = [
        {
            "name": "Press Your Pollock",
            "points": points(),
            "user_id": 1,
            "league_id": 1,
        },
        {
            "name": "I Maeda Mistake",
            "points": points(),
            "user_id": 9,
            "league_id": 1,
        },
        {
            "name": "Yes We Kenley!",
            "points": points(),
            "user_id": 2,
            "league_id": 1,
        },
        {
            "name": "Joc Straps",
            "points": points(),
            "user_id": 3,
            "league_id": 1,
        },
        {
            "name": "Hell's Bellinger",
            "points": points(),
            "user_id": 4,
            "league_id": 1,
        },
        {
            "name": "Buehler's Day Off",
            "points": points(),
            "user_id": 5,
            "league_id": 1,
        },
        {
            "name": "I Did It All For The Mookie",
            "points": points(),
            "user_id": 6,
            "league_id": 1,
        },
        {
            "name": "Scherzer Thing",
            "points": points(),
            "user_id": 7,
            "league_id": 1,
        },
        {
            "name": "Ryu Jays",
            "points": points(),
            "user_id": 8,
            "league_id": 1,
        },
        {
            "name": "The Bryce is Right",
            "points": points(),
            "user_id": 10,
            "league_id": 1,
        },
        {
            "name": "The Bichette is Back",
            "points": points(),
            "user_id": 11,
            "league_id": 2,
        },
        {
            "name": "Acuña Matata",
            "points": points(),
            "user_id": 12,
            "league_id": 2,
        },
        {
            "name": "RBI'd for Her Pleasure",
            "points": points(),
            "user_id": 13,
            "league_id": 2,
        },
        {
            "name": "Dansby Swansong",
            "points": points(),
            "user_id": 14,
            "league_id": 2,
        },
        {
            "name": "Wriggly Feels",
            "points": points(),
            "user_id": 15,
            "league_id": 2,
        },
        {
            "name": "Lester We Forget",
            "points": points(),
            "user_id": 16,
            "league_id": 3,
        },
        {
            "name": "The Life of Bryant",
            "points": points(),
            "user_id": 17,
            "league_id": 3,
        },
        {
            "name": "Ring My Bellinger",
            "points": points(),
            "user_id": 18,
            "league_id": 3,
        },
        {
            "name": "Brooklyn Trolley Dodgers",
            "points": points(),
            "user_id": 19,
            "league_id": 3,
        },
        {
            "name": "Joc Itch",
            "points": points(),
            "user_id": 20,
            "league_id": 3,
        },
        {
            "name": "I Like Big Betts",
            "points": points(),
            "user_id": 21,
            "league_id": 3,
        },
        {
            "name": "All Betts Are Off",
            "points": points(),
            "user_id": 22,
            "league_id": 3,
        },
        {
            "name": "Babe Ruthless",
            "points": points(),
            "user_id": 23,
            "league_id": 3,
        },
        {
            "name": "Angels in the Troutfield",
            "points": points(),
            "user_id": 24,
            "league_id": 3,
        },
        {
            "name": "Maybe This Year",
            "points": points(),
            "user_id": 25,
            "league_id": 14,
        },
        {
            "name": "Honey Nut Ichiros",
            "points": points(),
            "user_id": 26,
            "league_id": 14,
        },
        {
            "name": "Bryce Krispies",
            "points": points(),
            "user_id": 27,
            "league_id": 14,
        },
        {
            "name": "Eggs Odorizzi",
            "points": points(),
            "user_id": 28,
            "league_id": 14,
        },
        {
            "name": "Rally Monkeys",
            "points": points(),
            "user_id": 29,
            "league_id": 14,
        },
        {
            "name": "Southside Southpaws",
            "points": points(),
            "user_id": 30,
            "league_id": 14,
        },
        {
            "name": "Madbum",
            "points": points(),
            "user_id": 31,
            "league_id": 14,
        },
        {
            "name": "The Balking Dead",
            "points": points(),
            "user_id": 32,
            "league_id": 14,
        },
        {
            "name": "Lil Sebastian's Favorite Team",
            "points": points(),
            "user_id": 33,
            "league_id": 14,
        },
        {
            "name": "Men of Steal",
            "points": points(),
            "user_id": 34,
            "league_id": 14,
        },
        {
            "name": "Lovable Losers",
            "points": points(),
            "user_id": 35,
            "league_id": 14,
        },
        {
            "name": "Working the Count",
            "points": points(),
            "user_id": 36,
            "league_id": 14,
        },
        {
            "name": "Stroman Troopers",
            "points": points(),
            "user_id": 37,
            "league_id": 14,
        },
        {
            "name": "A Puig of Their Own",
            "points": points(),
            "user_id": 38,
            "league_id": 14,
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
