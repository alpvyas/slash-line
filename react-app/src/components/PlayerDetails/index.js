import React from "react";
import Table from "../Table";

import "./PlayerDetail.css";

const PlayerDetail = (player) => {



  const columnsA = ["Team", "Position", "Bats",
                   "Throws", "Height", "Weight", "DOB"];
  const columnsB = ["G", "AB", "R",
                   "H", "2B", "3B", "HR", "RBI", "BB", "SO", "SB", "CS", "AVG", "OBP", "SLG", "OPS"];

  const row_keys_A = ["team_name", "position_txt", "bats", "throws", "height_feet", "weight", "birth_date"];

  const row_keys_B = ["g", "ab", "r", "h", "d", "t", "hr", "rbi", "bb", "so", "sb", "cs", "avg", "obp", "slg", "ops"]

  return (
    <>
      <div className="player-detail-container">
        <div className="header-container">
          <h3>{player.name_display_first_last}</h3>
        </div>
        <div className="content-container">
          <div className="player-headshot"></div>
          <div className="player-stats-container">
            <Table columns={columnsA} rows={[player]} row_keys={row_keys_A}/>
          </div>
        </div>
      </div>
    </>
  )
};

export default PlayerDetail;