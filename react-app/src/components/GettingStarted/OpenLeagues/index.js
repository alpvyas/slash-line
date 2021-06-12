import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import './OpenLeagues.css';

const OpenLeagues = () => {

  const [step, setStep] = useState("first");

  return (
    <>
      <div className="card">
        <h2>That's ok! Here are some open leagues that you can join.</h2>
        <form className="input-container">
          
        </form>
        <div className="buttons-container">
          <Button className="new-league-button" variant="outlined" color="primary" onClick={() => setStep("joinRandomLeague")}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default OpenLeagues;