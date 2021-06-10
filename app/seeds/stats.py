from flask import json, session
from app.models import db, Player_Stats
import requests

teams = [144, 146, 121, 143, 120, 112, 113, 158, 134, 138, 109, 115, 119, 135,
         137, 110, 111, 147, 139, 141, 145, 114, 116, 118, 142, 117, 108, 133, 136, 140]


def seed_player_stats():

    players = []

    for team in teams:
        response = requests.get(
            f"http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='{team}'"
        )
        data = json.loads(response.text)
        roster = data["roster_40"]["queryResults"]["row"]
        players = [*players, *roster]

    for player in players:
        player_id = player["player_id"]

        player_response = requests.get(
            f"http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='{player_id}'")

        full_player_data = json.loads(player_response.text)

        player_data = full_player_data["player_info"]["queryResults"]["row"]

        response = requests.get(
            f"http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2021'&player_id='{player_id}'")

        data = json.loads(response.text)

        if ((data["sport_hitting_tm"]["queryResults"]["totalSize"]) == "1"):
            stats_data = data["sport_hitting_tm"]["queryResults"]["row"]

            stats = Player_Stats(mlb_player_id=player_id,


                                 full_name=player_data["name_display_first_last_html"],
                                 team_abbrev=player_data["team_abbrev"],
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
