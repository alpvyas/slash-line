from .db import db
import datetime


class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True)

    bio = db.Column(db.String(255))
    location = db.Column(db.String(255))
    avatar = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "bio": self.bio,
            "location": self.location,
            "avatar": self.avatar,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "update_at": self.updated_at,
        }
