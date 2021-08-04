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
import { addNewTeam } from '../../store/userTeams';


const Confirm = ({ userSelections }) => {
  const dispatch = useDispatch();

  const {
    userID,
    teamName,
    colors,
    leagueID,
    aboutMe,
    location,
    avatar } = userSelections;

  const handleSubmit = () => {
    dispatch(addNewTeam(teamName, colors, leagueID, userID))
  };
  return (
    <>
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4" align="center">You're All Done!</Typography>
        </DialogTitle>
          <DialogContent>
          <DialogContentText>
            <Typography variant="h6" align="center">Take one final look over everything and click submit when you're ready.</Typography>
          </DialogContentText>
            
          </DialogContent>
          <DialogActions style={{justifyContent: 'center'}}>
            <Button className="submit-button" onClick={() => handleSubmit()}>Submit</Button>
          </DialogActions>
    </>
  );
};

export default Confirm;