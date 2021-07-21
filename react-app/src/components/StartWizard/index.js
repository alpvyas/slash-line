import React, { useState } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Start from './Start';
import JoinLeague from './JoinLeague';
import slashline_logo from "../../images/logo.png";
import './StartWizard.css';

const StartWizard = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [step, setStep] = useState("start");


  return (
    <>
    <Dialog
        open={true}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ overflow: "hidden" }}
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
        {step === 'start' && <Start step={step} setStep={setStep} />}
        {step === 'joinLeague' && <JoinLeague step={step} setStep={setStep} />}

      </Dialog>
    </>
  )
};

export default StartWizard;