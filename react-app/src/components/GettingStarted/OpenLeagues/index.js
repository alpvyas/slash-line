import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import './OpenLeagues.css';
import { useDispatch } from 'react-redux';
import { getOpenLeagues } from '../../../store/leagues';
import Table from "../../Table";

const OpenLeagues = () => {
  const dispatch = useDispatch()
  const [step, setStep] = useState("first");
  const [openLeagues, setOpenLeagues] = useState(undefined)

  useEffect(() => {
    dispatch(getOpenLeagues())
    .then(leagues => {
      setOpenLeagues(leagues);
    })

  }, []);

  const columns = ["League Name", "League Type", "Permissions",
                   "Draft", "Draft Date", "Draft Time", ""];

  const row_keys = ["name", "league_type", "permissions", "draft_type", "date", "time"];

  const leagues = openLeagues.map(league => {
    let draftDateTime = league["draft_date"];
    let dateTimeArray = draftDateTime.split(" ");
    let date = dateTimeArray[0];
    let time = dateTimeArray[1];

    let dateArray = date.split("-");
  
    let timeArray = time.split(":");

    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];

    const hour_24_clock = parseInt(timeArray[0], 10);
    const hour = hour_24_clock - 15;
    const minutes = parseInt(timeArray[1], 10);
    const formatted_minutes = minutes < 10 ? `0${minutes}` : minutes;
    const AMPM = hour_24_clock < 12 ? "AM" : "PM"

    league.date = `${month} / ${day} / ${year}`
    league.time = `${hour}:${formatted_minutes} ${AMPM}`
    return league

  })
  


  return (
    <>

        <h2>That's ok! Here are some open leagues that you can join.</h2>
        <form className="input-container">
          <div className="create-league-container">
            <div className="header">
              <h3>Leagues</h3>
            </div>
           <Table columns={columns} rows={leagues} row_keys={row_keys} joinOpen={true}/>
          </div>
        </form>
        <div className="buttons-container">
          <Button className="new-league-button" variant="outlined" color="primary" onClick={() => setStep("joinRandomLeague")}>
            Next
          </Button>
        </div>
    </>
  );
};

export default OpenLeagues;