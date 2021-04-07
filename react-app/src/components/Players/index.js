import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_roster_40, teams } from "../../store/players";
import Table from "../Table";

const Players = () => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.players)

  const get_players_by_pos = (players, positions) => {
    const position_players = players.filter(player => positions.includes(player["position_txt"]))

    return position_players;
  };

  useEffect(() => {
    teams.forEach((team) => {
      dispatch(get_roster_40(team.id))
      })
  
    }, [])


  return (
    <div className="container page-container">
      
      <Table 
      columns={["Pitchers",  "Position", "Team", "Bats", "Throws", "Height", "Weight", "DOB"]}
      rows={get_players_by_pos(players, ["P"])}
      row_keys={["name_display_first_last", "position_txt", "team_name", "bats", "throws", "height_feet", "weight", "birth_date"]}
      />
      <Table 
      columns={["Catchers",  "POS", "TEAM", "B/T", "HT", "WT", "DOB"]}
      rows={get_players_by_pos(players, ["C"])}
      row_keys={["name_display_first_last", "position_txt", "team_name", "bats", "throws", "height_feet", "weight", "birth_date"]}
      />
      <Table 
      columns={["Infielders",  "POS", "TEAM", "B/T", "HT", "WT", "DOB"]}
      rows={get_players_by_pos(players, ["1B", "2B", "3B", "SS"])}
      row_keys={["name_display_first_last", "position_txt", "team_name", "bats", "throws", "height_feet", "weight", "birth_date"]}
      />
      <Table 
      columns={["Outfielders",  "POS", "TEAM", "B/T", "HT", "WT", "DOB"]}
      rows={get_players_by_pos(players, ["LF", "RF", "CF", "OF"])}
    row_keys={["name_display_first_last", "position_txt", "team_name", "bats", "throws", "height_feet", "weight", "birth_date"]}
      />
    </div>
  )
}

export default Players;