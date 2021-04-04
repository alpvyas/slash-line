import React from "react";
import { useSelector } from "react-redux";
import LeagueFormModal from "../LeagueFormModal";
import NavBar from "../NavBar/index";
import "./Homepage.css";

const Homepage = () => {
  let user = useSelector((state) => state.session.user);

  return (
    <>
      <div className="container page-container">
        <NavBar />
        <div className="create-league-container">
          <LeagueFormModal />
        </div>
      </div>
    </>
  )
}

export default Homepage;