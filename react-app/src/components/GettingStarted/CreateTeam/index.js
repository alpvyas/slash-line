import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import './CreateTeam.css';
import { useDispatch } from 'react-redux';

const CreateTeam = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState("first");
  const [teamName, setTeamName] = useState("");

  const checkName = () => {

    dispatch()
  }

  return (
    <>

        <h2>You're in the League!</h2>
        <h2>Let's create your team.</h2>
        <form className="input-container">
          <TextField
            variant="outlined"
            label="Team Name"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
          />

          {/* <div>
            <label>Auto-select my players for me</label>
            <Checkbox color="primary"/>
          </div> */}
        </form>
        <div className="buttons-container">
          <Button className="create-team-container" variant="outlined" color="primary" onClick={() => setStep("joinRandomLeague")}>
            Next
          </Button>
        </div>
    </>
  );
};

export default CreateTeam;