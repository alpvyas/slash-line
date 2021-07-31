import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup, validateEmail, validateUsername } from '../../store/session';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import './CreateLeague.css';

const CreateLeagueForm = ({ setAuthenticated, setSignup, setLogin }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [leagueName, setLeagueName] = useState('');
  const [leagueType, setLeagueType] = useState('');
  const [permissions, setPermissions] = useState('')
  const [draft, setDraft] = useState('');
  const [draftDate, setDraftDate] = useState('');
  const [draftTime, setDraftTime] = useState('');
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');

  const leagueTypes = [
    {
      value: 'standard',
      label: 'Standard',
    },
    {
      value: 'rotisserie',
      label: 'Rotisserie',
    },
    {
      value: 'points-only',
      label: 'Points Only',
    },
    {
      value: 'h2h',
      label: 'Head-to-head',
    },
    {
      value: 'h2h-points',
      label: 'Head-to-Head - Points',
    },
  ];

  const permissionTypes = [
    {
      value: 'comissioner',
      label: 'Comissioner Only',
    },
    {
      value: 'managers',
      label: 'All Managers',
    },
  ];

  const draftTypes = [
    {
      value: 'live-standard',
      label: 'Live Standard Draft',
    },
    {
      value: 'live-salary',
      label: 'Live Salary Cap Draft',
    },
    {
      value: 'auto',
      label: 'Auto-pick Draft',
    },
    {
      value: 'offline',
      label: 'Offline Draft',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!errorStatus){
    // const successfulSignUp = dispatch(signup(username, firstName, lastName, email, password))
    //     .then(res => {
    //       if (res.errors) setErrors({...errors, signUpError: res.errors, signUpErrorStatus: true})
    //     })
    // }
  };

  // const loginForm = () => {
  //   setSignup(false);
  //   setLogin(true);
  // };

  const updateLeagueName = (name) => {
    setLeagueName(name);
  };
  const updateLeagueType = (type) => {
    setLeagueType(type);
  };

  const updatePermissions = (permissions) => {
    setPermissions(permissions);
  };

  const updateDraft = (type) => {
    setDraft(type);
  };

  const updateDraftDate = (date) => {
    setDraftDate(date);
  };

  const updateDraftTime = (time) => {
    setDraftTime(time);
  };

  const updatePasscode = (code) => {
    setDraftTime(code);
  };
  const updateConfirmPasscode = (code) => {
    setDraftTime(code);
  };

  // const checkEmail = (email) => {
  //   const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   if (regex.test(String(email).toLowerCase())) {
  //     dispatch(validateEmail(email))
  //     .then(valid => {
  //       if (!valid) {
  //         setErrors({...errors, emailError: "This email already exists. Please use another.", emailErrorStatus: true});
  //       } else {
  //         setErrors({...errors, emailError: "", emailErrorStatus: false});
  //       }
  //     });
  //   } else {
  //     setErrors({...errors, emailError: "This is not a valid email address.", emailErrorStatus: true});
  //   }
  // };

  // const validatePasscode = () => {
  //   const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,72}$/;
  //   if (!regex.test(password)) {
  //     setErrors({...errors, passwordError: "Passwords must be at least 8 characters in length and must contain at least one uppercase letter, one lowercase letter, one number and one special character.", passwordErrorStatus: true});
  //   } else {
  //     setErrors({...errors, passwordError: "", passwordErrorStatus: false});
  //   }
  // };

  //check overall error status
  const errorStatus = (errors.usernameErrorStatus || errors.passwordErrorStatus || errors.confirmPasswordErrorStatus || errors.emailErrorStatus);

  //check if username is valid
  const checkUsername = (username) => {
    dispatch(validateUsername(username))
    .then(valid => {
      if (!valid) {
        setErrors({...errors, usernameError: "This username already exists. Please try another.", usernameErrorStatus: true})
      } else {
        setErrors({...errors, usernameError: "", usernameErrorStatus: false})
      }
    })
  };

  //check if password match
  // const checkPasswordMatch = (confirmedPassword) => {
  //   if (!(password === confirmedPassword)) {
  //       setErrors({...errors, confirmPasswordError: "Passwords do not match.", confirmPasswordErrorStatus: true});
  //   } else {
  //     setErrors({...errors, confirmPasswordError: "", confirmPasswordErrorStatus: false});
  //   }
  // };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(login(username, email, password)).then((res) => {
  //     if (!res.errors) {
  //       setAuthenticated(true);
  //     } else {
  //       setErrors(res.errors);
  //     };
  //   } )
  // };

  return (
    <>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" align="center">Create League</Typography>
      </DialogTitle>
        <DialogContent>
        <DialogContentText>
          <Typography variant="h6" align="center">Let's establish a new league!</Typography>
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="League Name"
            type="text"
            variant="outlined"
            fullWidth
            // required={true}
            value={leagueName}
            onChange={(e) => updateLeagueName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="select-type"
            select
            label="League Type"
            variant="outlined"
            fullWidth
            // required={true}
            value={leagueType}
            onChange={(e) => updateLeagueType(e.target.value)}
          >
            {leagueTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="permissions"
            select
            label="Permissions"
            variant="outlined"
            fullWidth
            // required={true}
            // error={errors.usernameErrorStatus}
            // helperText={errors.usernameError}
            value={permissions}
            onChange={(e) => updatePermissions(e.target.value)}
          >
             {permissionTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="draft"
            select
            label="Draft"
            variant="outlined"
            fullWidth
            // required={true}
            // error={errors.emailErrorStatus}
            // helperText={errors.emailError}
            value={draft}
            onChange={(e) => updateDraft(e.target.value)}
          >
            {draftTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="date"
            // label="Draft Date"
            type="date"
            variant="outlined"
            fullWidth
            // required={true}
            // error={errors.passcodeErrorStatus}
            helperText={"Select a date for the draft"}
            value={draftDate}
            onChange={(e) => updateDraftDate(e.target.value)}
          />
          <TextField
            margin="dense"
            id="time"
            // label="Draft Time"
            type="time"
            variant="outlined"
            fullWidth
            // required={true}
            // error={errors.passcodeErrorStatus}
            helperText={"Select a time for the draft"}
            value={draftTime}
            onChange={(e) => updateDraftTime(e.target.value)}
          />
          <TextField
            margin="dense"
            id="passcode"
            label="Passcode"
            type="passcode"
            variant="outlined"
            fullWidth
            // required={true}
            // error={errors.passcodeErrorStatus}
            // helperText={errors.passcodeError}
            value={passcode}
            onChange={(e) => updatePasscode(e.target.value)}
          />
          <TextField
            margin="dense"
            id="confirm-passcode"
            label="Confirm Passcode"
            type="passcode"
            variant="outlined"
            fullWidth
            // required={true}
            // error={errors.confirmPasscodeErrorStatus}
            // helperText={errors.confirmPasscodeError}
            value={confirmPasscode}
            onChange={(e) => updateConfirmPasscode(e.target.value)}
            onPaste={e => e.preventDefault()}
          />
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <Button disabled={errorStatus} className="submit-button" onClick={(e) => handleSubmit(e)}>Submit</Button>
        </DialogActions>
    </>
  );
};

export default CreateLeagueForm;