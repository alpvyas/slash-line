from .db import db


class MLB_Team(db.Model):
    __tablename__ = "mlb_teams"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), nullable=False, unique=True)
    stadium = db.Column(db.String(30), nullable=False, unique=True)
    city = db.Column(db.String(30), nullable=False, unique=False)
    state = db.Column(db.String(30), nullable=False, unique=False)
    league = db.Column(db.String(30), nullable=False, unique=False)
    division = db.Column(db.String(30), nullable=False, unique=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "stadium": self.stadium,
            "city": self.city,
            "state": self.state,
            "league": self.league,
            "division": self.division
        }
