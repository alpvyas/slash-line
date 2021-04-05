from app.models import db
import datetime


class Player_Stats(db.Model):
    __tablename__ = "player_stats"

    id = db.Column(db.Integer, primary_key=True)

    position = db.Column(db.String(30), nullable=False)
    roster_status = db.Column(db.String(30), nullable=False)
    bats = db.Column(db.Integer, nullable=False, unique=False)
    throws = db.Column(db.Integer, nullable=False, unique=False)
    hits = db.Column(db.Integer, nullable=False, unique=False, default=0)
    at_bats = db.Column(db.Integer, nullable=False, unique=False, default=0)
    runs = db.Column(db.Integer, nullable=False, unique=False, default=0)
    home_runs = db.Column(db.Integer, nullable=False, unique=False, default=0)
    rbi = db.Column(db.Integer, nullable=False, unique=False, default=0)
    stolen_bases = db.Column(db.Integer, nullable=False,
                             unique=False, default=0)
    batting_avg = db.Column(db.Float, nullable=False,
                            unique=False, default=0.00)
    innings_pitched = db.Column(db.Float, nullable=False,
                                unique=False, default=0.0)
    wins = db.Column(db.Integer, nullable=False, unique=False, default=0)
    saves = db.Column(db.Integer, nullable=False, unique=False, default=0)
    strike_outs = db.Column(db.Integer, nullable=False,
                            unique=False, default=0)
    era = db.Column(db.Float, nullable=False, unique=False, default=0.00)
    whip = db.Column(db.Float, nullable=False, unique=False, default=0.00)
    player_id = db.Column(db.Integer, db.ForeignKey("players.id"),
                          nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "position": self.position,
            "roster_status": self.roster_status,
            "bats": self.bats,
            "throws": self.throws,
            "hits": self.hits,
            "at_bats": self.at_bats,
            "runs": self.runs,
            "home_runs": self.home_runs,
            "rbi": self.rbi,
            "stolen_bases": self.stolen_bases,
            "batting_avg": self.batting_avg,
            "innings_pitched": self.innings_pitched,
            "wins": self.wins,
            "saves": self.saves,
            "strike_outs": self.strike_outs,
            "era": self.era,
            "whip": self.whip,
            "player_id": self.player_id,
            "update_at": self.updated_at,
        }
