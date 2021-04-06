import React, { useState }from "react";
import { useSelector } from "react-redux";
import LeagueFormModal from "../LeagueFormModal";
import NavBar from "../NavBar/index";
import Table from "../Table";
import "./Homepage.css";

const Homepage = () => {
  let user = useSelector((state) => state.session.user);

  const leagues = [
    {
      name: "Catcus League",
      type: "Rotisserie",
      permissions: "Commissioner Only",
      draft: "Live Standard Draft",
      draft_date: "2021-04-21",
      draft_time: "12:00",
    },
    {
      name: "Mountain League",
      type: "Rotisserie",
      permissions: "Commissioner Only",
      draft: "Live Standard Draft",
      draft_date: "2021-04-21",
      draft_time: "12:00",
    },
  ];

  return (
    <>
      <div className="container page-container">
        <NavBar />
        <div className="create-league-container">
          <LeagueFormModal />
        </div>
        <div>
          <Table />
        </div>
      </div>
    </>
  )
}

export default Homepage;