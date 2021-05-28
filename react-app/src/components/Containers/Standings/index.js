import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_league_teams } from "../../../store/teams";
import Table from "../../Table";
import "./Standings.css";

const Standings = () => {
  const dispatch = useDispatch();
  const currentLeague = useSelector(state => state.currentLeague);

  const [teams, setTeams] = useState([]);

  useEffect(() => {
      dispatch(get_league_teams(currentLeague))
      .then(teams => setTeams(teams));
    
  }, [dispatch])

  const headers = ["Rank", "Team", "Points"];
  const row_keys = ["id", "name", "wins"];
  return (
      // <div className="standings-container">
      <>
        <div className="table">
          <Table columns={headers} rows={teams} row_keys={row_keys}/>
        </div>
      </>
  )
};

export default Standings;