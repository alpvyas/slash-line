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
import Avatar from '@material-ui/core/Avatar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import cities from '../../cityData';
import { makeStyles } from '@material-ui/core/styles';


const ProfileBasics = ({ setStep, setAboutMe, setLocation, setAvatar, user }) => {

  const updateAboutMe = (bio) => {
    setAboutMe(bio)
  };

  const updateLocation = (location) => {
    setLocation(location);
  };

  const updateAvatar = (file) => {
    setAvatar(file);
  };

  const handleBack = () => {
    setStep('createTeam');
  };
  return (
    <>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" align="center">Profile Basics</Typography>
      </DialogTitle>
        <DialogContent>
        <DialogContentText>
          <Typography variant="h6" align="center">You're almost done! Take some time to fill out your user profile. You can upload an avatar and fill out a short bio. This step is optional.</Typography>
        </DialogContentText>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Avatar style={{height: '150px', width: '150px'}}>{user.first_name[0] + user.last_name[0]}</Avatar>
            <TextField
                autoFocus
                // variant="outlined"
                margin="dense"
                id="image"
                // label="Location"
                type="file"
                style={{width: '25vh', align: 'center'}}
                // error={errors.teamNameErrorStatus}
                // helperText={errors.teamNameError}
                onChange={(e) => updateAvatar(e.target.file)}
              />
            {/* <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="location"
                label="Location"
                type="s"
                style={{width: '25vh', align: 'center'}}
                // error={errors.teamNameErrorStatus}
                // helperText={errors.teamNameError}
                onChange={(e) => updateLocation(e.target.value)}
              /> */}
              <Autocomplete
                id="location"
                options={cities}
                getOptionLabel={(option) => {
                  if(option.state) {
                    return `${option.name}, ${option.state}`;
                  } else {
                    return `${option.name}, ${option.country}`;
                  }
                }}
                style={{ width: '25vh' }}
                renderInput={(params) => <TextField {...params} label="Location" variant="outlined" margin="dense" style={{width: '25vh', align: 'center'}} onChange={(e) => updateLocation(e.target.value)}/>}
              />
            <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="bio"
                label="About Me"
                type="text"
                multiline
                style={{width: '25vh', align: 'center'}}
                // error={errors.teamNameErrorStatus}
                // helperText={errors.teamNameError}
                onChange={(e) => updateAboutMe(e.target.value)}
              />
          </div>
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <Button className="submit-button" onClick={() => handleBack()}>Back</Button>
          <Button className="submit-button" onClick={() => setStep("joinLeague")}>Submit</Button>
        </DialogActions>
    </>
  );
};

export default ProfileBasics;