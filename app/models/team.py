import datetime
from .db import db


class Team(db.Model):
    __tablename__ = "teams"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), nullable=False, unique=True)
    logo = db.Column(db.String(30), nullable=True)
    points = db.Column(db.Integer, nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    league_id = db.Column(db.Integer, db.ForeignKey("leagues.id"),
                          nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "logo": self.logo,
            "points": self.points,
            "user_id": self.user_id,
            "league_id": self.league_id,
            "created_at": self.created_at,
            "update_at": self.updated_at,
        }
