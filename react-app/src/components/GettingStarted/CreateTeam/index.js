import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import './CreateTeam.css';

const CreateTeam = () => {

  const [step, setStep] = useState("first");

  return (
    <>

        <h2>You're in the League!</h2>
        <h2>Let's create your team.</h2>
        <form className="input-container">
          <TextField variant="outlined" label="Team Name"></TextField>
          <div>
            <label>Auto-select my players for me</label>
            <Checkbox color="primary"/>
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

export default CreateTeam;