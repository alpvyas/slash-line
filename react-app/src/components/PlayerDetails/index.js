import React from "react";
import Table from "../Table";

import "./PlayerDetail.css";

const PlayerDetail = (player, name) => {

  const columnsA = ["Team", "Position", "Bats",
                   "Throws", "Height", "Weight", "DOB"];
  const columnsB = ["G", "AB", "R",
                   "H", "2B", "3B", "HR", "RBI", "BB", "SO", "SB", "CS", "AVG", "OBP", "SLG", "OPS"];

  const row_keys_A = ["mlb_team_name", "primary_position_txt", "bats", "throws", "height", "weight", "birth_date"];

  const row_keys_B = ["g", "ab", "r", "h", "d", "t", "hr", "rbi", "bb", "so", "sb", "cs", "avg", "obp", "slg", "ops"]

  

  return (
    <>
      <div className="player-detail-container">
        <div className="header-container">
          <h4>{player.name}</h4>
        </div>
        <div className="content-container">
          <div className="player-headshot"></div>
          <div className="player-stats-container">
            <Table columns={columnsB} rows={[player.player]} row_keys={row_keys_B}/>
          </div>
        </div>
      </div>
    </>
  )
};

export default PlayerDetail;