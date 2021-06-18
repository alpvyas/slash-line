import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import './Success.css';

const Success = () => {

  const [step, setStep] = useState("first");

  return (
    <>

        <h2>You're all set!</h2>
        <h2>Make sure you sign players to your team.</h2>
        <div className="buttons-container">
          <Button className="new-league-button" variant="outlined" color="primary" onClick={() => setStep("joinRandomLeague")}>
            Complete Setup
          </Button>
        </div>
    </>
  );
};

export default Success;