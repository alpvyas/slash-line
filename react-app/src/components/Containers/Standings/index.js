import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_league_teams } from "../../../store/userTeams";
import Table from "../../Table";
import "./Standings.css";

const Standings = (user) => {
  const dispatch = useDispatch();
  const currentLeague = useSelector(state => state.leagues.current);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (user && (currentLeague !== undefined)) {
      const teamsObj = currentLeague.teams
      const teamsArray = []
      for (const team in teamsObj){
        teamsArray.push(teamsObj[team].info)
      }
      setTeams(teamsArray)
    }
  }, [dispatch, user, currentLeague])

  const headers = ["Rank", "Team", "Points"];
  const row_keys = ["id", "name", "points"];
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