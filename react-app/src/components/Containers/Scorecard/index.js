import React from "react";
import "./Scorecard.css";


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
          <div className="row-item">
            <b>{game.AwayTeam}</b>
          </div>
          <div className="row-item">
            <b>{game.AwayTeamHits}</b>
          </div>
        </div>
        <div className="card-row">
          <div className="row-item">
            <b>{game.HomeTeam}</b>
          </div>
          <div className="row-item">
            <b>{game.HomeTeamHits}</b>
          </div>
        </div>
        <div className="card-row">
          {content}
        </div>
      </div>
  )
};

export default Scorecard;