from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from .db import db


class IRL_Team(db.Model):
    __tablename__ = "irl_teams"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), nullable=False, unique=True)
    players = db.relationship(
        "Player", backref="IRL_Team", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
