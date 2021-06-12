import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import JoinLeague from '../JoinLeague';
import './Start.css';

const Start = () => {

  const [action, setAction] = useState("none");
  
  return (
    
      <div className="card"> 


        {action === "none" && (
          <>
          <h2>Let's Get Started!</h2>
          <div className="buttons-container">
            <Button className="join-button" variant="outlined" color="primary" onClick={() => setAction("join") }>
              Join A League
            </Button>

            <Button className="new-league-button" variant="outlined" color="primary" >
              Start a New League
            </Button>
          </div> 
        </>
        )}


        {action==="join" && <JoinLeague />}
        {/* {action==="create" && <CreateLeague />} */}

      </div> 
   
  );
};

export default Start;