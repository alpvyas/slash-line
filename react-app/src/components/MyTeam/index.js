import React from "react";
import { useSelector } from "react-redux";
import Table from "../Table";
import "./MyTeam.css";

const MyTeam = () => {
  const user = useSelector((state) => state.session.user);

  const columns = ["B/T", "HT", "WT", "DOB", "POS"];
  const players = [
                    {
                      name:"Cody Bellinger",
                      bt: "L/L",
                      ht: "6'4",
                      wt: "203",
                      dob: "07/13/1995",
                      pos: "RF",
                    },
  ];
  const keys = ["name", "bt", "ht", "wt", "dob", "pos", ];
  return (
    <>
      {/* <Table columns={["Pitchers", ...columns]}/>
      <Table columns={["Catchers", ...columns]}/>
      <Table columns={["Infielders", ...columns]}/> */}
      <Table columns={["Outfielders", ...columns]} rows={players} row_keys={keys}/>
    </>
  )

};

export default MyTeam;