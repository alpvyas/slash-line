import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_roster_40, teams } from "../../store/players";
import NavBar from "../NavBar";
import ReactTable from "../ReactTable";
import Table from "../Table";


const Players = () => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.players)

  const columns = useMemo(() => [
    {
      Header: "Player",
      accessor: "name_display_first_last",
    },
    {
      Header: "Position",
      accessor: "position_txt",
    },
    {
      Header: "Team",
      accessor: "team_name",
    },
    {
      Header: "Bats",
      accessor: "bats",
    },
    {
      Header: "Throws",
      accessor: "throws",
    },
    {
      Header: "Height",
      accessor: "height_feet",
    },
    {
      Header: "Weight",
      accessor: "weight",
    },
    {
      Header: "DOB",
      accessor: "birth_date",
    },
  ], []);

  const get_players_by_pos = (players, positions) => {
    const position_players = players.filter(player => positions.includes(player["position_txt"]))

    return position_players;
  };

  useEffect(() => {
    teams.forEach(async (team) => {
     await dispatch(get_roster_40(team.id))
      })
  
    }, [dispatch])

    

  return (
    <>
      {/* <NavBar /> */}
      <div className="container page-container">
        <ReactTable columns={columns} data={players}/>
        {/* <Table 
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
        /> */}
      </div>
    </>
  )
}

export default Players;