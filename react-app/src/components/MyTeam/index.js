import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";
import ReactTable from "../ReactTable";
import "./MyTeam.css";

const MyTeam = () => {
  const user = useSelector((state) => state.session.user);

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

  const players = [
                    {
                      name_display_first_last:"Cody Bellinger",
                      team_name: "Los Angeles Dodgers",
                      bats: "L",
                      throws: "L",
                      height_feet: "6'4",
                      weight: "203",
                      birth_date: "07/13/1995",
                      position_txt: "RF",
                    },
  ];

  return (
    <>
      {/* <Table columns={["Pitchers", ...columns]}/>
      <Table columns={["Catchers", ...columns]}/>
      <Table columns={["Infielders", ...columns]}/> */}
      <NavBar />
      <ReactTable columns={columns} data={players} />
    </>
  )

};

export default MyTeam;