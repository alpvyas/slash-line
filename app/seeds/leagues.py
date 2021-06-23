from app.models import db, League
import datetime


def seed_leagues():

    leagues = [
        {
            "name": "Cactus League",
            "league_type": "Rotisserie",
            "permissions": "Commissioner Only",
            "draft_type": "Live Standard Draft",
            "user_id": 1,
        },
        {
            "name": "Grapefruit League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 1
        },
        {
            "name": "Eastern League",
            "league_type": "Head-to-Head",
            "permissions": "All Managers",
            "draft_type": "Live Standard Draft",
            "user_id": 2
        },
        {
            "name": "Southern League",
            "league_type": "Rotisserie",
            "permissions": "All Managers",
            "draft_type": "Live Salary Cap Draft",
            "user_id": 3
        },
        {
            "name": "Western League",
            "league_type": "Head-to-Head",
            "permissions": "Commissioner Only",
            "draft_type": "Auto Draft",
            "user_id": 4
        },
        {
            "name": "Midwest League",
            "league_type": "Points",
            "permissions": "All Managers",
            "draft_type": "Auto Draft",
            "user_id": 5
        },
        {
            "name": "California League",
            "league_type": "Rotisserie",
            "permissions": "Commissioner Only",
            "draft_type": "Live Standard Draft",
            "user_id": 6
        },
        {
            "name": "Pacific Coast League",
            "league_type": "Head-to-Head - Points",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 7
        },
        {
            "name": "Peach League",
            "league_type": "Points Only",
            "permissions": "All Managers",
            "draft_type": "Offline Draft",
            "user_id": 8
        },
        {
            "name": "Watermelon League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 9
        },
        {
            "name": "Banana League",
            "league_type": "Rotisserie",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 10
        },
        {
            "name": "Cherry League",
            "league_type": "Points Only",
            "permissions": "All Managers",
            "draft_type": "Live Standard Draft",
            "user_id": 11
        },
        {
            "name": "Strawberry League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 12
        },
        {
            "name": "Blueberry League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Live Standard Draft",
            "user_id": 0,
        },
        {
            "name": "Apple League",
            "league_type": "Points Only",
            "permissions": "All Managers",
            "draft_type": "Live Salary Cap Draft",
            "user_id": 2
        },
        {
            "name": "Orange League",
            "league_type": "Rotisserie",
            "permissions": "Commissioner Only",
            "draft_type": "Live Standard Draft",
            "user_id": 3
        },
        {
            "name": "Plum League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Live Salary Cap Draft",
            "user_id": 3
        },
        {
            "name": "Papaya League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 4
        },
        {
            "name": "Guava League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 0,
        },
        {
            "name": "Avocado League",
            "league_type": "Rotisserie",
            "permissions": "All Managers",
            "draft_type": "Live Standard Draft",
            "user_id": 5,
        },
        {
            "name": "Pumpkin League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Live Standard Draft",
            "user_id": 5,
        },
        {
            "name": "Mango League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Live Standard Draft",
            "user_id": 0,
        },
        {
            "name": "Apricot League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 0,
        },
        {
            "name": "Pear League",
            "league_type": "Points Only",
            "permissions": "All Managers",
            "draft_type": "Live Standard Draft",
            "user_id": 6,
        },
        {
            "name": "Cabbage League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Live Standard Draft",
            "user_id": 7,
        },
        {
            "name": "Coconut League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Live Salary Cap Draft",
            "user_id": 7,
        },
        {
            "name": "Lemon League",
            "league_type": "Points Only",
            "permissions": "Commissioner Only",
            "draft_type": "Offline Draft",
            "user_id": 8,
        },
        {
            "name": "Pineapple League",
            "league_type": "Rotisserie",
            "permissions": "All Managers",
            "draft_type": "Offline Draft",
            "user_id": 0,
        }

    ]

    for league in leagues:
        d = League(name=league["name"],
                   league_type=league["league_type"],
                   permissions=league["permissions"],
                   draft_type=league["draft_type"],
                   draft_date=datetime.datetime.now(),
                   draft_time=datetime.datetime.now(),
                   user_id=league["user_id"]
                   )
        db.session.add(d)
        db.session.commit()
