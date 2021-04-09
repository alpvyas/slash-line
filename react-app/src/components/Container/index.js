import { Table } from "@material-ui/core";
import React from "react";
import gameDetailsReducer from "../../store/gameDetails";
import "./Container.css";

const Alert = (data) => {
  
  return (
    <>
      <div className="alert-container container">
        <div className="alert-icon">
          <i />
        </div>
        <div className="alert-body">
          <div className="alert-content">
            <p></p>
            <div className="alert-footer">
              <div className="form-field"></div>
              <button className="alert-action-button"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

const Standings = (data) => {
  
  const headers = ["Rank", "Team", "Points"]
  //need to get teams that belong to league
  //need to sort/rank the teams by points

  return (
    <>
      <div className="standings-container container">
        <Table columns={headers} />
      </div>
    </>  
  )
};

const Notices = () => {
  
  return (
    <>
      <div className="notices-container container">
        <div className="notice-container-header">
          <div className="header-text">
            <h3>NOTICE</h3>
          </div>
          <div className="settings-container">
            <button></button>
          </div>
        </div>
      </div>
    </>
  )
};

const Scorecard = ({ game }) => {

  const inning_half = game.InningHalf === "T" ? "Top " : "Bottom ";

  const datetime = game.DateTime;

  const datetime_array = datetime.split("T");
  const time = datetime_array[1].split(":");
  const hour_24_clock = parseInt(time[0], 10);
  const hour = hour_24_clock - 15;
  const minutes = parseInt(time[1], 10);
  const formatted_minutes = minutes < 10 ? `0${minutes}` : minutes;

  const AMPM = hour_24_clock < 12 ? "AM" : "PM"

  const game_time = " " + hour.toString(10) + ":" + formatted_minutes.toString(10) + AMPM;

  let content;

  if (game.Status === "InProgress"){
      content = <span> {inning_half}{game.Inning} </span>;
  }else if (game.Status === "Scheduled"){
      content = <span> Today {game_time} </span>;
  }else if (game.Status === "Final"){
      content = <span> Final </span>;
  }else{
    content = <span> TBD </span>
  }


  return (
      <div className="card-container">
        <div className="card-row">
          <span>
            <b>{game.AwayTeam}</b>
            <mark>
              <b>{game.AwayTeamHits}</b>
            </mark>
          </span>
        </div>
        <div className="card-row">
          <span>
            <b>{game.HomeTeam}</b>
            <mark>
              <b>{game.HomeTeamHits}</b>
            </mark>
          </span>
        </div>
        <div className="card-row">
          {content}
        </div>
      </div>
  )
};


export default Scorecard;