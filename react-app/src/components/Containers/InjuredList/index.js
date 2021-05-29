import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { make_active } from "../../../store/userTeam";
import ReactTable from "../../ReactTable";
import Table from "../../Table";

const InjuredList = () => {

  const dispatch = useDispatch();
  const injuredPlayers = useSelector(state => state.userTeam.injuredList);

  const makeActive = (player) => {
    const response = dispatch(make_active(player))
    console.log("REMOVE FROM IL: ", response)
  }

  // const players = [
  //                   {
  //                     name_display_first_last:"Cody Bellinger",
  //                     position_txt: "RF",
  //                     il_status: "IL-10",
  //                     date_added: "04/10/2021",
  //                     change_status: changeStatus,
  //                     remove_button: removeILButton,
  //                   },
  //                   {
  //                     name_display_first_last:"Cody Bellinger",
  //                     position_txt: "RF",
  //                     il_status: "IL-10",
  //                     date_added: "04/10/2021",
  //                     change_status: changeStatus,
  //                     remove_button: removeILButton,
  //                   },
  //                   {
  //                     name_display_first_last:"Cody Bellinger",
  //                     position_txt: "RF",
  //                     il_status: "IL-10",
  //                     date_added: "04/10/2021",
  //                     change_status: changeStatus,
  //                     remove_button: removeILButton,
  //                   },
  //                 ]

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
      Header: "",
      accessor: "player_id",
      Cell: props => (
        <button onClick={() => makeActive(props.row.original)}>
           Make Active
        </button>
      ),
    },
  ], []);


  // const columns = ["Player", "Position", "", ""];
  // const row_keys = ["name_display_first_last", "position_txt", "change_status", "remove_button"]

  return (
    <>
      <div className="il-container">
        <ReactTable columns={columns} data={injuredPlayers}/>
      </div>
    </>
  )
};

export default InjuredList;