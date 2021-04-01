from app.models import db, IRL_Team


def seed_irl_teams():

    teams = [
        {
            "name": "Braves",
            "stadium": "Truist Park",
            "city": "Atlanta",
            "state": "Georgia",
            "league": "NL",
            "division": "East"
        },
        {
            "name": "Marlins",
            "stadium": "LoanDepot Park",
            "city": "Miami",
            "state": "Florida",
            "league": "NL",
            "division": "East"
        },
        {
            "name": "Mets",
            "stadium": "Citi Field",
            "city": "Queens, New York",
            "state": "New York",
            "league": "NL",
            "division": "East"
        },
        {
            "name": "Phillies",
            "stadium": "Citizens Bank Park",
            "city": "Philadelphia",
            "state": "Pennsylvania",
            "league": "NL",
            "division": "East"
        },
        {
            "name": "Nationals",
            "stadium": "Nationals Park",
            "city": "Washington",
            "state": "DC",
            "league": "NL",
            "division": "East"
        },
        {
            "name": "Cubs",
            "stadium": "Wrigley Field",
            "city": "Chicago",
            "state": "Illinois",
            "league": "NL",
            "division": "Central"
        },
        {
            "name": "Reds",
            "stadium": "Great American Ball Park",
            "city": "Cincinnati",
            "state": "Ohio",
            "league": "NL",
            "division": "Central"
        },
        {
            "name": "Brewers",
            "stadium": "American Family Field",
            "city": "Milwaukee",
            "state": "Minnesota",
            "league": "NL",
            "division": "Central"
        },
        {
            "name": "Pirates",
            "stadium": "PNC Park",
            "city": "Pitsburg",
            "state": "Pennsylvania",
            "league": "NL",
            "division": "Central"
        },
        {
            "name": "Cardinals",
            "stadium": "Busch Stadium",
            "city": "St. Louis",
            "state": "Missouri",
            "league": "NL",
            "division": "Central"
        },
        {
            "name": "Diamondbacks",
            "stadium": "Chase Field",
            "city": "Phoenix",
            "state": "Arizona",
            "league": "NL",
            "division": "West"
        },
        {
            "name": "Rockies",
            "stadium": "Coors Field",
            "city": "Denver",
            "state": "Colorado",
            "league": "NL",
            "division": "West"
        },
        {
            "name": "Dodgers",
            "stadium": "Dodger Stadium",
            "city": "Los Angeles",
            "state": "California",
            "league": "NL",
            "division": "West"
        },
        {
            "name": "Padres",
            "stadium": "Petco Park",
            "city": "San Diego",
            "state": "California",
            "league": "NL",
            "division": "West"
        },
        {
            "name": "Giants",
            "stadium": "Oracle Park",
            "city": "San Francisco",
            "state": "California",
            "league": "NL",
            "division": "West"
        },
        {
            "name": "Orioles",
            "stadium": "Camden Yards",
            "city": "Baltimore",
            "state": "Maryland",
            "league": "AL",
            "division": "East"
        },
        {
            "name": "Red Sox",
            "stadium": "Fenway Park",
            "city": "Boston",
            "state": "Massachusetts",
            "league": "AL",
            "division": "East"
        },
        {
            "name": "Yankees",
            "stadium": "Yankee Stadium",
            "city": "Bronx, New York",
            "state": "New York",
            "league": "AL",
            "division": "East"
        },
        {
            "name": "Rays",
            "stadium": "Tropicana Field",
            "city": "Tampa Bay",
            "state": "Florida",
            "league": "AL",
            "division": "East"
        },
        {
            "name": "Blue Jays",
            "stadium": "Rogers Centre",
            "city": "Toronto",
            "state": "Ontario",
            "league": "AL",
            "division": "East"
        },
        {
            "name": "White Sox",
            "stadium": "Guaranteed Rate Field",
            "city": "Chicago",
            "state": "Illinois",
            "league": "AL",
            "division": "Central"
        },
        {
            "name": "Indians",
            "stadium": "Progressive Field",
            "city": "Cleveland",
            "state": "Ohio",
            "league": "AL",
            "division": "Central"
        },
        {
            "name": "Tigers",
            "stadium": "Comerica Park",
            "city": "Detroit",
            "state": "Michigan",
            "league": "AL",
            "division": "Central"
        },
        {
            "name": "Royals",
            "stadium": "Kauffman Stadium",
            "city": "Kansas City",
            "state": "Missouri",
            "league": "AL",
            "division": "Central"
        },
        {
            "name": "Twins",
            "stadium": "Target Field",
            "city": "Minneapolis",
            "state": "Minnesota",
            "league": "AL",
            "division": "Central"
        },
        {
            "name": "Astros",
            "stadium": "Minute Maid Park",
            "city": "Houston",
            "state": "Texas",
            "league": "AL",
            "division": "West"
        },
        {
            "name": "Angels",
            "stadium": "Angel Stadium",
            "city": "Anaheim",
            "state": "California",
            "league": "AL",
            "division": "West"
        },
        {
            "name": "Athletics",
            "stadium": "Oakland Coliseum",
            "city": "Oakland",
            "state": "California",
            "league": "AL",
            "division": "West"
        },
        {
            "name": "Mariners",
            "stadium": "T-Mobile Park",
            "city": "Seattle",
            "state": "Washington",
            "league": "AL",
            "division": "West"
        },
        {
            "name": "Rangers",
            "stadium": "Globe Life Field",
            "city": "Arlington",
            "state": "Texas",
            "league": "AL",
            "division": "West"
        }
    ]

    for team in teams:
        t = IRL_Team(name=team["name"],
                     stadium=team["stadium"],
                     city=team["city"],
                     state=team["state"],
                     league=team["league"],
                     division=team["division"]
                     )
        db.session.add(t)
        db.session.commit()
