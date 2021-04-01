import datetime
from .db import db


class Player(db.Model):
    __tablename__ = "players"

    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    number = db.Column(db.Integer, nullable=False, unique=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"), nullable=False)
    irl_team_id = db.Column(
        db.Integer, db.ForeignKey("irl_teams.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "number": self.number,
            "created_at": self.created_at,
            "update_at": self.updated_at,
        }
