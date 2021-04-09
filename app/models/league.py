from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
import datetime
from .db import db


class League(db.Model):
    __tablename__ = "leagues"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(30), nullable=False, unique=True)
    league_type = db.Column(db.String(30), nullable=False)
    permissions = db.Column(db.String(30), nullable=False,
                            default="Commissioner Only")
    draft = db.Column(db.String(30), nullable=False,
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
            "name": self.name,
            "league_type": self.league_type,
            "permissions": self.permissions,
            "draft": self.draft,
            "draft_date": self.draft_date,
            "draft_time": self.draft_time,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "update_at": self.updated_at,
        }
