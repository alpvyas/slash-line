import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from "../Table";
import { makeStyles } from '@material-ui/core/styles';
import { getOpenLeagues, joinUserLeague } from '../../store/leagues';


const JoinLeague = ({ step, setStep}) => {

  const dispatch = useDispatch();

  return (
    <>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" align="center">Create a Team</Typography>
      </DialogTitle>
        <DialogContent>
        <DialogContentText>
         <Typography variant="h6" align="center">Let's build your team! First, choose a team name</Typography>

        </DialogContentText>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="leagueID"
              label="League ID"
              type="text"
              style={{width: '25vh', align: 'center'}}
              error={errors.leagueIDErrorStatus}
              helperText={errors.leagueIDError}
              onChange={(e) => updateLeagueID(e.target.value)}
            />
            <TextField
              margin="dense"
              variant="outlined"
              id="passcode"
              label="Passcode"
              type="text"
              style={{width: '25vh', align: 'center'}}
              error={errors.passcodeErrorStatus}
              helperText={errors.passcodeError}
              onChange={(e) => updatePasscode(e.target.value)}
            />
          </div>
          

          {leagueType === 'open' && 
            <>
              <div className="leagues-container">
                <div className="header">
                  <h3>Leagues</h3>
                </div>
                <Table columns={columns} rows={leagues} row_keys={row_keys} joinOpen={true}/>
              </div>
            </>
          }
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          {leagueType === '' && 
            <>
              <Button className="submit-button" onClick={() => setLeagueType("private")}>Join Private League</Button>
              <Button className="submit-button" onClick={() => setLeagueType("open")}>Join Open League</Button>
            </>
          }

          {leagueType !== '' && <Button className="submit-button" onClick={() => handleBack()}>Back</Button>}
          {leagueType !== '' && <Button className="submit-button" onClick={() => handleJoin()}>Join League</Button>}
        </DialogActions>
    </>
  )
};

export default JoinLeague;