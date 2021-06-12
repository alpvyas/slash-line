import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import JoinUserLeague from '../JoinUserLeague';
import './JoinLeague.css';

const JoinLeague = () => {

  const [action, setAction] = useState("");

  return (
      <div className="card">

        {action==="" && (
          <>
            <h2>Do you have a League ID and passcode?</h2>

            <div className="buttons-container">

              <Button className="join-button" variant="outlined" color="primary" onClick={() => setAction("join")}>
                Yes, I have the league credentials
              </Button>

              <Button className="new-league-button" variant="outlined" color="primary" onClick={() => ("joinRandomLeague")}>
                No, I don't have that information.
              </Button>

            </div>
          </>
        )};


        {action==="join" && (
          <>
            <JoinUserLeague />
          </>)};

      </div>

  );
};

export default JoinLeague;