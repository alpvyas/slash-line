import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import slashline_logo from "../../images/logo.png";
import ballInGlove from '../../images/baseball-glove-dirt.png';
import { update_stats } from '../../store/stats';
import { update_players } from '../../store/players';
import './Admin.css';

const StartWizard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const updatePlayers = () => {
    dispatch(update_players());
  };

  const updateStats = () => {
    dispatch(update_stats());
  };

  return (
<>
        <Dialog
            open={true}
            aria-labelledby="form-dialog-title"
            // style={{ overflow: "hidden", backgroundImage: `url(${ballInGlove})`}}
            style={{ background: `url(${ballInGlove}) no-repeat center center fixed`, backgroundSize: "cover"}}
            className="page-container"
          >
            <div style={{ padding: 20 }}>
            <Grid
              container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              
              style={{margin: '15px 15px -15px 15px'}}
            >
              <img alt="logo" src={slashline_logo} style={{height: '50px', width: '50px'}} />
              <Typography variant="h3" align="center" style={{color: '#ef3e42', textShadow: '-1px -1px 0 #ef3e42, 1px -1px 0 #ef3e42, -1px 1px 0 #ef3e42, 1px 1px 0 #ef3e42'}}>Slash Line Baseball</Typography>
            </Grid>
            </div>
            <DialogTitle id="form-dialog-title">
              <Typography variant="h4" align="center">Welcome Administrator!</Typography>
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
              <Typography variant="h6" align="center">Here you can take actions for application maintainance and debugging.</Typography>
            </DialogContentText>
            
            </DialogContent>
            <DialogActions style={{justifyContent: 'center'}}>
              <Button className="submit-button" onClick={() => updatePlayers()}>Update Players and Stats</Button>
              <Button className="submit-button" onClick={() => updateStats()}>Update Stats</Button>
            </DialogActions>
          </Dialog>
      </>
  )
};

export default StartWizard;