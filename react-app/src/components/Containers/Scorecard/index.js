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

  const generateKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  };

  return (
      <div key={ generateKey() } className="card-container">
        <div key={ generateKey() } className="card-row">
          <div key={ generateKey() } key={ generateKey() } className="row-item-team">
            <b key={ generateKey() }>{game.AwayTeam}</b>
          </div>
          <div key={ generateKey() } className="row-item-runs">
            <b key={ generateKey() }>{game.AwayTeamHits}</b>
          </div>
        </div>
        <div key={ generateKey() } className="card-row">
          <div key={ generateKey() } className="row-item-team">
            <b key={ generateKey() }>{game.HomeTeam}</b>
          </div>
          <div key={ generateKey() } className="row-item-runs">
            <b key={ generateKey() }>{game.HomeTeamHits}</b>
          </div>
        </div>
        <div key={ generateKey() } className="card-row-status">
          {content}
        </div>
      </div>
  )
};

export default Scorecard;