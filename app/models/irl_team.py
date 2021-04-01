from sqlalchemy.orm import backref
from .db import db


class IRL_Team(db.Model):
    __tablename__ = "irl_teams"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), nullable=False, unique=True)
    stadium = db.Column(db.String(30), nullable=False, unique=True)
    city = db.Column(db.String(30), nullable=False, unique=False)
    state = db.Column(db.String(30), nullable=False, unique=False)
    league = db.Column(db.String(10), nullable=False, unique=False)
    division = db.Column(db.String(10), nullable=False, unique=False)
    players = db.relationship(
        "Player", backref="IRL_Team", cascade="all, delete-orphan")

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
