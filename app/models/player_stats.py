from app.models import db
import datetime


class Player_Stats(db.Model):
    __tablename__ = "player_stats"

    id = db.Column(db.Integer, primary_key=True)

    mlb_player_id = db.Column(db.String, nullable=False, default="")

    a = db.Column(db.String(10), nullable=True, default="")
    ab = db.Column(db.String(10), nullable=True, default="")
    ao = db.Column(db.String(10), nullable=True, default="")
    avg = db.Column(db.String(10), nullable=True, default="")
    babip = db.Column(db.String(10), nullable=True, default="")
    bb = db.Column(db.String(10), nullable=True, default="")
    bb9 = db.Column(db.String(10), nullable=True, default="")
    bk = db.Column(db.String(10), nullable=True, default="")
    cg = db.Column(db.String(10), nullable=True, default="")
    cs = db.Column(db.String(10), nullable=True, default="")
    cspct = db.Column(db.String(10), nullable=True, default="")
    d = db.Column(db.String(10), nullable=True, default="")
    dp = db.Column(db.String(10), nullable=True, default="")
    e = db.Column(db.String(10), nullable=True, default="")
    er = db.Column(db.String(10), nullable=True, default="")
    era = db.Column(db.String(10), nullable=True, default="")
    fpct = db.Column(db.String(10), nullable=True, default="")
    g = db.Column(db.String(10), nullable=True, default="")
    gf = db.Column(db.String(10), nullable=True, default="")
    gidp = db.Column(db.String(10), nullable=True, default="")
    go = db.Column(db.String(10), nullable=True, default="")
    go_ao = db.Column(db.String(10), nullable=True, default="")
    gs = db.Column(db.String(10), nullable=True, default="")
    gsh = db.Column(db.String(10), nullable=True, default="")
    h = db.Column(db.String(10), nullable=True, default="")
    h9 = db.Column(db.String(10), nullable=True, default="")
    hb = db.Column(db.String(10), nullable=True, default="")
    hbp = db.Column(db.String(10), nullable=True, default="")
    hld = db.Column(db.String(10), nullable=True, default="")
    hr = db.Column(db.String(10), nullable=True, default="")
    hr9 = db.Column(db.String(10), nullable=True, default="")
    ibb = db.Column(db.String(10), nullable=True, default="")
    inn = db.Column(db.String(10), nullable=True, default="")
    ir = db.Column(db.String(10), nullable=True, default="")
    irs = db.Column(db.String(10), nullable=True, default="")
    k = db.Column(db.String(10), nullable=True, default="")
    k9 = db.Column(db.String(10), nullable=True, default="")
    kbb = db.Column(db.String(10), nullable=True, default="")
    l = db.Column(db.String(10), nullable=True, default="")
    lob = db.Column(db.String(10), nullable=True, default="")
    np = db.Column(db.String(10), nullable=True, default="")
    o = db.Column(db.String(10), nullable=True, default="")
    obp = db.Column(db.String(10), nullable=True, default="")
    ofa = db.Column(db.String(10), nullable=True, default="")
    ops = db.Column(db.String(10), nullable=True, default="")
    pa = db.Column(db.String(10), nullable=True, default="")
    pb = db.Column(db.String(10), nullable=True, default="")
    pip = db.Column(db.String(10), nullable=True, default="")
    po = db.Column(db.String(10), nullable=True, default="")
    qs = db.Column(db.String(10), nullable=True, default="")
    r = db.Column(db.String(10), nullable=True, default="")
    roe = db.Column(db.String(10), nullable=True, default="")
    rbi = db.Column(db.String(10), nullable=True, default="")
    rs9 = db.Column(db.String(10), nullable=True, default="")
    s = db.Column(db.String(10), nullable=True, default="")
    sb = db.Column(db.String(10), nullable=True, default="")
    sbpct = db.Column(db.String(10), nullable=True, default="")
    sf = db.Column(db.String(10), nullable=True, default="")
    sh = db.Column(db.String(10), nullable=True, default="")
    sho = db.Column(db.String(10), nullable=True, default="")
    slg = db.Column(db.String(10), nullable=True, default="")
    so = db.Column(db.String(10), nullable=True, default="")
    sv = db.Column(db.String(10), nullable=True, default="")
    svo = db.Column(db.String(10), nullable=True, default="")
    svpct = db.Column(db.String(10), nullable=True, default="")
    t = db.Column(db.String(10), nullable=True, default="")
    tb = db.Column(db.String(10), nullable=True, default="")
    tbf = db.Column(db.String(10), nullable=True, default="")
    tc = db.Column(db.String(10), nullable=True, default="")
    tp = db.Column(db.String(10), nullable=True, default="")
    tpa = db.Column(db.String(10), nullable=True, default="")
    w = db.Column(db.String(10), nullable=True, default="")
    whip = db.Column(db.String(10), nullable=True, default="")
    wo = db.Column(db.String(10), nullable=True, default="")
    wp = db.Column(db.String(10), nullable=True, default="")
    wpct = db.Column(db.String(10), nullable=True, default="")
    xbh = db.Column(db.String(10), nullable=True, default="")
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
