import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { get_league_teams } from "../../../store/teams";
import Table from "../../Table";
import "./Standings.css";

const Standings = () => {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
      dispatch(get_league_teams(1))
      .then(teams => setTeams(teams));
    
  }, [dispatch])

  const headers = ["Rank", "Team", "Points"];
  const row_keys = ["id", "name", "wins"];
  return (
    <>
      <div className="standings-container">
        <div className="header">
          <h3>Standings</h3>
        </div>
        <div className="table">
          <Table columns={headers} rows={teams} row_keys={row_keys}/>
        </div>

      </div>
    </>
  )
};

export default Standings;