from .db import db


class User_Team_Player(db.Model):
    __tablename__ = "user_team_players"

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey(
        "players.id"), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("teams.id"),
                        nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "player_id": self.player_id,
            "team_id": self.team_id,

        }
