from .db import db


class User_Team_Player(db.Model):
    __tablename__ = "user_team_players"

    id = db.Column(db.Integer, primary_key=True)
    mlb_player_id = db.Column(db.String(30), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"),
                        nullable=False)
    status = db.Column(db.String(30), nullable=False, default="active")

    def to_dict(self):
        return {
            "id": self.id,
            "mlb_player_id": self.mlb_player_id,
            "team_id": self.team_id,
            "status": self.status,

        }
