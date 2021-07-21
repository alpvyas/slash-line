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


const Start = ({ step, setStep}) => {

  return (
    <>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" align="center">Welcome!</Typography>
      </DialogTitle>
        <DialogContent>
        <DialogContentText>
          <Typography variant="h6" align="center">Let's get you started here at Slash Line. When you're ready move on to the next step.</Typography>
        </DialogContentText>
          
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <Button className="submit-button" onClick={() => setStep("joinLeague")}>Let's Go!</Button>
        </DialogActions>
    </>
  );
};

export default Start;