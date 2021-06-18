import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './JoinUserLeague.css';

const JoinUserLeague = () => {

  const [credentials, setCredentials] = useState(undefined);

  return (
   
 <>

        {credentials===undefined && (
          <>
            <h2>Great! Enter the League ID and passcode below</h2>

            <form className="input-container">
              <TextField variant="outlined" label="League ID"></TextField>
              <TextField variant="outlined" label="Passcode"></TextField>
            </form>

            <div className="buttons-container">

              <Button className="new-league-button" variant="outlined" color="primary" onClick={() => setCredentials(true)}>
                Join this league
              </Button>

            </div>
          </>
        )}

      </>
   
  )
};

export default JoinUserLeague;