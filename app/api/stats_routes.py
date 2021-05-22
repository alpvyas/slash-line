from flask import Blueprint, jsonify, request, json, session
from datetime import date
import requests
from app.models import db, Player, Player_Stats

stats_routes = Blueprint("stats_routes",
                         __name__)

# ------------------------------------------------------------------------------
#                         Stats Operation Functions
# ------------------------------------------------------------------------------


def update():

    delete = Player_Stats.query.all()
    for stats in delete:
        db.session.delete(stats)
        db.session.commit()

    game_type = "R"
    today = date.today()
    year = today.year

    players = Player.query.all()

    for player in players:
        player_id = player.mlb_player_id

        response = requests.get(
            f"http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='{game_type}'&season='{year}'&player_id='{player_id}'")

        data = json.loads(response.text)

        if ((data["sport_hitting_tm"]["queryResults"]["totalSize"]) == "1"):
            stats_data = data["sport_hitting_tm"]["queryResults"]["row"]

            stats = Player_Stats(mlb_player_id=player_id,


                                 ab=stats_data["ab"],
                                 ao=stats_data["ao"],
                                 avg=stats_data["avg"],
                                 babip=stats_data["babip"],
                                 bb=stats_data["bb"],
                                 #  bb9=stats_data["bb9"],
                                 #  bk=stats_data["bk"],
                                 #  cg=stats_data["cg"],
                                 cs=stats_data["cs"],
                                 #  cspct=stats_data["cspct"],
                                 d=stats_data["d"],
                                 #  dp=stats_data["dp"],
                                 #  e=stats_data["e"],
                                 #  er=stats_data["er"],
                                 #  era=stats_data["era"],
                                 #  fpct=stats_data["fpct"],
                                 g=stats_data["g"],
                                 #  gf=stats_data["gf"],
                                 gidp=stats_data["gidp"],
                                 go=stats_data["go"],
                                 go_ao=stats_data["go_ao"],
                                 #  gs=stats_data["gs"],
                                 #  gsh=stats_data["gsh"],
                                 h=stats_data["h"],
                                 #  h9=stats_data["h9"],
                                 #  hb=stats_data["hb"],
                                 #  hbp=stats_data["hbp"],
                                 #  hld=stats_data["hld"],
                                 hr=stats_data["hr"],
                                 #  hr9=stats_data["hr9"],
                                 ibb=stats_data["ibb"],
                                 #  inn=stats_data["inn"],
                                 #  ir=stats_data["ir"],
                                 #  irs=stats_data["irs"],
                                 #  k=stats_data["k"],
                                 #  k9=stats_data["k9"],
                                 #  kbb=stats_data["kbb"],
                                 #  l=stats_data["l"],
                                 lob=stats_data["lob"],
                                 np=stats_data["np"],
                                 #  o=stats_data["o"],
                                 obp=stats_data["obp"],
                                 #  ofa=stats_data["ofa"],
                                 ops=stats_data["ops"],
                                 #  pa=stats_data["pa"],
                                 #  pb=stats_data["pb"],
                                 #  pip=stats_data["pip"],
                                 #  po=stats_data["po"],
                                 #  qs=stats_data["qs"],
                                 r=stats_data["r"],
                                 roe=stats_data["roe"],
                                 rbi=stats_data["rbi"],
                                 #  rs9=stats_data["rs9"],
                                 #  s=stats_data["s"],
                                 sb=stats_data["sb"],
                                 #  sbpct=stats_data["sbpct"],
                                 sf=stats_data["sf"],
                                 #  sh=stats_data["sh"],
                                 #  sho=stats_data["sho"],
                                 slg=stats_data["slg"],
                                 so=stats_data["so"],
                                 #  sv=stats_data["sv"],
                                 #  svo=stats_data["svo"],
                                 #  svpct=stats_data["svpct"],
                                 t=stats_data["t"],
                                 tb=stats_data["tb"],
                                 #  tbf=stats_data["tbf"],
                                 #  tc=stats_data["tc"],
                                 #  tp=stats_data["tp"],
                                 tpa=stats_data["tpa"],
                                 #  w=stats_data["w"],
                                 #  whip=stats_data["whip"],
                                 wo=stats_data["wo"],
                                 #  wp=stats_data["wp"],
                                 #  wpct=stats_data["wpct"],
                                 xbh=stats_data["xbh"],
                                 )

            db.session.add(stats)
            db.session.commit()

    return jsonify({"message": "Player Stats have been updated."})


def get_season_stats():

    stats = Player_Stats.query.all()
    print("BACKEND STATS: ", stats)

    print("TYPE: ", type(stats[0]))
    return jsonify(stats[0].to_dict())

# ------------------------------------------------------------------------------
#                    RESTful Routes -- Stats
# ------------------------------------------------------------------------------


@stats_routes.route("/", methods=['GET'])
def get_stats():
    return get_season_stats()


@stats_routes.route("/update", methods=['GET'])
def update_stats():
    return update()
