from app.models import db
import datetime


class Player_Stats(db.Model):
    __tablename__ = "player_stats"

    id = db.Column(db.Integer, primary_key=True)

    a = db.Column(db.String(10), nullable=True)
    ab = db.Column(db.String(10), nullable=True)
    ao = db.Column(db.String(10), nullable=True)
    avg = db.Column(db.String(10), nullable=True)
    babip = db.Column(db.String(10), nullable=True)
    bb = db.Column(db.String(10), nullable=True)
    bb9 = db.Column(db.String(10), nullable=True)
    bk = db.Column(db.String(10), nullable=True)
    cg = db.Column(db.String(10), nullable=True)
    cs = db.Column(db.String(10), nullable=True)
    cspct = db.Column(db.String(10), nullable=True)
    d = db.Column(db.String(10), nullable=True)
    dp = db.Column(db.String(10), nullable=True)
    e = db.Column(db.String(10), nullable=True)
    er = db.Column(db.String(10), nullable=True)
    era = db.Column(db.String(10), nullable=True)
    fpct = db.Column(db.String(10), nullable=True)
    g = db.Column(db.String(10), nullable=True)
    gf = db.Column(db.String(10), nullable=True)
    gidp = db.Column(db.String(10), nullable=True)
    go = db.Column(db.String(10), nullable=True)
    go_ao = db.Column(db.String(10), nullable=True)
    gs = db.Column(db.String(10), nullable=True)
    gsh = db.Column(db.String(10), nullable=True)
    h = db.Column(db.String(10), nullable=True)
    h9 = db.Column(db.String(10), nullable=True)
    hb = db.Column(db.String(10), nullable=True)
    hbp = db.Column(db.String(10), nullable=True)
    hld = db.Column(db.String(10), nullable=True)
    hr = db.Column(db.String(10), nullable=True)
    hr9 = db.Column(db.String(10), nullable=True)
    ibb = db.Column(db.String(10), nullable=True)
    inn = db.Column(db.String(10), nullable=True)
    ir = db.Column(db.String(10), nullable=True)
    irs = db.Column(db.String(10), nullable=True)
    k = db.Column(db.String(10), nullable=True)
    k9 = db.Column(db.String(10), nullable=True)
    kbb = db.Column(db.String(10), nullable=True)
    l = db.Column(db.String(10), nullable=True)
    lob = db.Column(db.String(10), nullable=True)
    np = db.Column(db.String(10), nullable=True)
    o = db.Column(db.String(10), nullable=True)
    obp = db.Column(db.String(10), nullable=True)
    ofa = db.Column(db.String(10), nullable=True)
    ops = db.Column(db.String(10), nullable=True)
    pa = db.Column(db.String(10), nullable=True)
    pb = db.Column(db.String(10), nullable=True)
    pip = db.Column(db.String(10), nullable=True)
    po = db.Column(db.String(10), nullable=True)
    qs = db.Column(db.String(10), nullable=True)
    r = db.Column(db.String(10), nullable=True)
    roe = db.Column(db.String(10), nullable=True)
    rbi = db.Column(db.String(10), nullable=True)
    rs9 = db.Column(db.String(10), nullable=True)
    s = db.Column(db.String(10), nullable=True)
    sb = db.Column(db.String(10), nullable=True)
    sbpct = db.Column(db.String(10), nullable=True)
    sf = db.Column(db.String(10), nullable=True)
    sh = db.Column(db.String(10), nullable=True)
    sho = db.Column(db.String(10), nullable=True)
    slg = db.Column(db.String(10), nullable=True)
    so = db.Column(db.String(10), nullable=True)
    sv = db.Column(db.String(10), nullable=True)
    svo = db.Column(db.String(10), nullable=True)
    svpct = db.Column(db.String(10), nullable=True)
    t = db.Column(db.String(10), nullable=True)
    tb = db.Column(db.String(10), nullable=True)
    tbf = db.Column(db.String(10), nullable=True)
    tc = db.Column(db.String(10), nullable=True)
    tp = db.Column(db.String(10), nullable=True)
    tpa = db.Column(db.String(10), nullable=True)
    w = db.Column(db.String(10), nullable=True)
    whip = db.Column(db.String(10), nullable=True)
    wo = db.Column(db.String(10), nullable=True)
    wp = db.Column(db.String(10), nullable=True)
    wpct = db.Column(db.String(10), nullable=True)
    xbh = db.Column(db.String(10), nullable=True)
    player_id = db.Column(db.Integer, db.ForeignKey(
        "players.id"), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    def to_dict(self):
        return {
            "id": self.id,
            "a": self.a,
            "ab": self.ab,
            "ao": self.ao,
            "avg": self.avg,
            "babip": self.babip,
            "bb": self.bb,
            "bb9": self.bb9,
            "bk": self.bk,
            "cg": self.cg,
            "cs": self.cs,
            "cspct": self.cspct,
            "d": self.d,
            "dp": self.dp,
            "e": self.e,
            "er": self.er,
            "era": self.era,
            "fpct": self.fpct,
            "g": self.g,
            "gf": self.gf,
            "gidp": self.gidp,
            "go": self.go,
            "go_ao": self.go_ao,
            "gs": self.gs,
            "gsh": self.gsh,
            "h": self.h,
            "h9": self.h9,
            "hb": self.hb,
            "hbp": self.hbp,
            "hld": self.hld,
            "hr": self.hr,
            "hr9": self.hr9,
            "ibb": self.ibb,
            "inn": self.inn,
            "ir": self.ir,
            "irs": self.irs,
            "k": self.k,
            "k9": self.k9,
            "kbb": self.kbb,
            "l": self.l,
            "lob": self.lob,
            "np": self.np,
            "o": self.o,
            "obp": self.obp,
            "ofa": self.ofa,
            "ops": self.ops,
            "pa": self.pa,
            "pb": self.pb,
            "pip": self.pip,
            "po": self.po,
            "qs": self.qs,
            "r": self.r,
            "roe": self.roe,
            "rbi": self.rbi,
            "rs9": self.rs9,
            "s": self.s,
            "sb": self.sb,
            "sbpct": self.sbpct,
            "sf": self.sf,
            "sh": self.sh,
            "sho": self.sho,
            "slg": self.slg,
            "so": self.so,
            "sv": self.sv,
            "svpct": self.svpct,
            "t": self.t,
            "tb": self.tb,
            "tbf": self.tbf,
            "tc": self.tc,
            "tp": self.tp,
            "tpa": self.tpa,
            "w": self.w,
            "whip": self.whip,
            "wo": self.wo,
            "wp": self.wp,
            "wpct": self.wpct,
            "xbh": self.xbh,

            "player_id": self.player_id,
            "update_at": self.updated_at,
        }
