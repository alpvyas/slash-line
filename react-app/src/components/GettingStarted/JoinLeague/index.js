import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './JoinLeague.css';

const JoinLeague = () => {

  const [step, setStep] = useState("first");

  return (
    <>
      <div className="card">
        <h2>Do you have a League ID and passcode?</h2>
        <div className="buttons-container">
          <Button className="join-button" variant="outlined" color="primary" onClick={() => setStep("joinUserLeague")}>
            Yes, I have the league credentials
          </Button>

          <Button className="new-league-button" variant="outlined" color="primary" onClick={() => setStep("joinRandomLeague")}>
            No, I don't have that information.
          </Button>
        </div>
      </div>
    </>
  );
};

export default JoinLeague;