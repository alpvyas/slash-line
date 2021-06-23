import datetime
from .db import db


class League(db.Model):
    __tablename__ = "leagues"

    id = db.Column(db.Integer, primary_key=True)

    passcode = db.Column(db.Integer, nullable=False, default=1253)
    name = db.Column(db.String(30), nullable=False, unique=True)
    league_type = db.Column(db.String(30), nullable=False)
    permissions = db.Column(db.String(50), nullable=False,
                            default="Commissioner Only")
    draft_type = db.Column(db.String(30), nullable=False,
                           default="Live Standard Draft")
    draft_date = db.Column(db.String(30), nullable=False)
    draft_time = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "passcode": self.passcode,
            "name": self.name,
            "league_type": self.league_type,
            "permissions": self.permissions,
            "draft_type": self.draft_type,
            "draft_date": self.draft_date,
            "draft_time": self.draft_time,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "update_at": self.updated_at,
        }
