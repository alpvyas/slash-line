import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import JoinUserLeague from '../JoinUserLeague';
import './JoinLeague.css';
import OpenLeagues from '../OpenLeagues';

const JoinLeague = () => {

  const [action, setAction] = useState("");

  return (
 <>

        {action==="" && (
          <>
            <h2>Do you have a League ID and passcode?</h2>

            <div className="buttons-container">

              <Button className="join-button" variant="outlined" color="primary" onClick={() => setAction("join")}>
                Yes, I have the league credentials
              </Button>

              <Button className="new-league-button" variant="outlined" color="primary" onClick={() => setAction("joinOpen")}>
                No, I don't have that information.
              </Button>

            </div>
          </>
        )}


        {action==="join" && (
          <>
            <JoinUserLeague />
          </>)}

        {action==="joinOpen" && (
          <>
            <OpenLeagues />
          </>)}
</>

  )
};

export default JoinLeague;