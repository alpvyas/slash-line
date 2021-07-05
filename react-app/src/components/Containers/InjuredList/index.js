import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { make_active } from "../../../store/userTeams";
import ReactTable from "../../ReactTable";
import Table from "../../Table";

const InjuredList = ({ players }) => {
  const dispatch = useDispatch();

  const makeActive = (player) => {
    const response = dispatch(make_active(player))
    console.log("REMOVE FROM IL: ", response)
  }


  const columns = useMemo(() => [
    {
      Header: "Player",
      accessor: "full_name",
    },
    {
      Header: "Position",
      accessor: "primary_position_txt",
    },
    {
      Header: "Team",
      accessor: "mlb_team_name",
    },
    {
      Header: "",
      accessor: "mlb_player_id",
      Cell: props => (
        <button onClick={() => makeActive(props.row.original)}>
           Make Active
        </button>
      ),
    },
  ], []);

  return (
    <>
      <div className="il-container">
        <ReactTable columns={columns} data={players}/>
      </div>
    </>
  )
};

export default InjuredList;