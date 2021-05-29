import datetime
from .db import db


class Player(db.Model):
    __tablename__ = "players"

    id = db.Column(db.Integer, primary_key=True)

    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    full_name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.String(30), nullable=False)
    bats = db.Column(db.String(30), nullable=False)
    birth_date = db.Column(db.String(30), nullable=False)
    height = db.Column(db.String(30), nullable=False)
    height_feet = db.Column(db.String(30), nullable=False)
    height_inches = db.Column(db.String(30), nullable=False)
    jersey_number = db.Column(db.String(30), nullable=False)
    mlb_player_id = db.Column(db.String(30), nullable=False)
    mlb_team_name = db.Column(db.String(50), nullable=False)
    nick_name = db.Column(db.String(30), nullable=False)
    primary_position = db.Column(db.String(30), nullable=False)
    primary_position_txt = db.Column(db.String(30), nullable=False)
    primary_stat_type = db.Column(db.String(30), nullable=False)
    status = db.Column(db.String(30), nullable=False)
    team_abbrev = db.Column(db.String(30), nullable=False)
    throws = db.Column(db.String(30), nullable=False)
    weight = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "full_name": self.full_name,
            "age": self.age,
            "bats": self.bats,
            "birth_date": self.birth_date,
            "height": self.height,
            "height_feet": self.height_feet,
            "height_inches": self.height_inches,
            "jersey_number": self.jersey_number,
            "mlb_player_id": self.mlb_player_id,
            "mlb_team_name": self.mlb_team_name,
            "nick_name": self.nick_name,
            "primary_position": self.primary_position,
            "primary_position_txt": self.primary_position_txt,
            "primary_stat_type": self.primary_stat_type,
            "status": self.status,
            "team_abbrev": self.team_abbrev,
            "throws": self.throws,
            "weight": self.weight,
            "created_at": self.created_at,
            "update_at": self.updated_at,
        }
