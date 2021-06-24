import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CreateTeam from '../CreateTeam';
import { useDispatch } from 'react-redux';
import { joinUserLeague } from '../../../store/leagues';
import './JoinUserLeague.css';

const JoinUserLeague = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState(false);
  const [errors, setErrors] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [passcode, setPasscode] = useState("");

  const joinLeague = () => {
    dispatch(joinUserLeague(leagueId, passcode))
    .then(
      (check) => {
        if (check.ok) {
          setCredentials(true);
        }
        else {
          setErrors(check.errors)
        }
      }
    )
  };

  return (
   <>
          {(!credentials) && (
            <>
            <h2>Great! Enter the League ID and passcode below</h2>

            <form className="input-container">
              <TextField
                variant="outlined"
                label="League ID"
                value={leagueId}
                onChange={e => setLeagueId(e.target.value)}
              />
              <TextField 
                variant="outlined"
                label="Passcode"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
              />
            </form>

            <div className="buttons-container">

              <Button className="new-league-button" variant="outlined" color="primary" onClick={() => joinLeague()}>
                Join this league
              </Button>

            </div>
            </>
          )}
            
          {credentials && <CreateTeam leagueId={leagueId}/>}
    </>
  )
};

export default JoinUserLeague;