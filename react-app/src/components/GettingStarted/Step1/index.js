import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './Step1.css';

const Step1 = () => {

  const [step, setStep] = useState("first");

  return (
    <>
      <div className="card">
        <h2>Let's Get Started!</h2>
        <div className="buttons-container">
          <Button className="join-button" variant="outlined" color="primary" onClick={() => setStep("joinLeague")}>
            Join A League
          </Button>

          <Button className="new-league-button" variant="outlined" color="primary" onClick={() => setStep("newLeague")}>
            Start a New League
          </Button>
        </div>
      </div> 
    </>
  );
};

export default Step1;