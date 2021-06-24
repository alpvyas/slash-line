import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { get_league_teams } from '../../../store/leagues';
import './CreateTeam.css';
import { useDispatch } from 'react-redux';

const CreateTeam = ({ leagueId }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState("first");
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("")

  const getCurrentTeams = () => {
    setTeamName(teamName)
    dispatch(get_league_teams(leagueId))
    .then(
      teams => {
        for (const team of teams){
          if (team.name === teamName){
            setMessage("That team name has already been taken. Try another one.")
          }else{
            setMessage("Success!")
          }
        }
      }
    )

  }

  return (
    <>
      {console.log("LEAGUE ID: ", leagueId)}
        <h2>You're in the League!</h2>
        <h2>Let's create your team.</h2>
        <form className="input-container">
          <TextField
            variant="outlined"
            label="Team Name"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
          />

          {message && <div>{message}</div>}

          {/* <div>
            <label>Auto-select my players for me</label>
            <Checkbox color="primary"/>
          </div> */}
        </form>
        <div className="buttons-container">
          <Button className="create-team-button" variant="outlined" color="primary" onClick={() => getCurrentTeams()}>
            Next
          </Button>
        </div>
    </>
  );
};

export default CreateTeam;