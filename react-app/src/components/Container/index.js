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

export const Standings = (data) => {
  
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

export const Notices = () => {
  
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
  const hour = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);

  const AMPM = hour < 12 ? "AM" : "PM"

  const game_time = " " + hour.toString(10) + ":" + minutes.toString(10) + AMPM;

  return (
    <>
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
          {game.status === "InProgress" && (
            <span> {inning_half}{game.Inning} </span>
          )}
          {game.status === "Scheduled" && (
            <span> Today{game_time} </span>
          )}
        </div>
      </div>
    </>
  )
}


export default Scorecard;