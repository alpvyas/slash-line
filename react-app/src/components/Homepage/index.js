import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link, useParams } from 'react-router-dom';
import { closeCreateLeague, openCreateLeague } from "../../store/createLeague";
import CreateLeagueModal from "../CreateLeagueModal";
import NavBar from "../NavBar/index";
import "./Homepage.css";

const Homepage = () => {
  let user = useSelector((state) => state.session.user);
  let LeagueModal = useSelector((state) => state?.createLeagueModal?.status);
  const dispatch = useDispatch();
  const createClick = (e) => {
    if (LeagueModal) dispatch(closeCreateLeague());
    else dispatch(openCreateLeague());
  };

  return (
    <>
      <CreateLeagueModal />
      <div className="container page-container">
        <NavBar />
        <div className="create-league-container">
          <button className="create-button" onClick={createClick}>Create League</button>
        </div>
      </div>
    </>
  )
}

export default Homepage;