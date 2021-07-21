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
import Box from '@material-ui/core/Box';
import './index.css';

const SignupForm = ({ setAuthenticated, setSignup, setLogin }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
    // let successfulSignUp = await dispatch(signup(username, firstName, lastName, email, password))
    //     .catch(async (res) => {
    //       console.log("THIS IS RES", res)
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors)
    //     })
    //     setErrors(successfulSignUp)
    //   }
  };

  const loginForm = () => {
    setSignup(false);
    setLogin(true);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (email) => {
    setEmail(email);
    checkEmail(email);
  };

  const updateUsername = (username) => {
    setUsername(username);
    checkUsername(username);
  };

  const updatePassword = (password) => {
    setPassword(password);
    validatePassword();
  };

  const updateConfirmPassword = (confirmedPassword) => {
    setConfirmPassword(confirmedPassword);
    checkPasswordMatch(confirmedPassword);
  };

  const checkEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(String(email).toLowerCase())) {
      dispatch(validateEmail(email))
      .then(valid => {
        if (!valid) {
          setErrors({...errors, emailError: "This email already exists. Please use another.", emailErrorStatus: true});
        } else {
          setErrors({...errors, emailError: "", emailErrorStatus: false});
        }
      });
    } else {
      setErrors({...errors, emailError: "This is not a valid email address.", emailErrorStatus: true});
    }
  };

  const validatePassword = () => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,72}$/;
    if (!regex.test(password)) {
      setErrors({...errors, passwordError: "Passwords must be at least 8 characters in length and must contain at least one uppercase letter, one lowercase letter, one number and one special character.", passwordErrorStatus: true});
    } else {
      setErrors({...errors, passwordError: "", passwordErrorStatus: false});
    }
  };

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
  const checkPasswordMatch = (confirmedPassword) => {
    if (!(password === confirmedPassword)) {
        setErrors({...errors, confirmPasswordError: "Passwords do not match.", confirmPasswordErrorStatus: true});
    } else {
      setErrors({...errors, confirmPasswordError: "", confirmPasswordErrorStatus: false});
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, email, password)).then((res) => {
      if (!res.errors) {
        setAuthenticated(true);
      } else {
        setErrors(res.errors);
      };
    } )
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" align="center">Sign Up</Typography>
      </DialogTitle>
        <DialogContent>
        <DialogContentText>
          <Typography variant="h6" align="center">To sign up, please fill out this form. All fields are required.</Typography>
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First Name"
            type="text"
            variant="outlined"
            fullWidth
            // required={true}
          />
          <TextField
            margin="dense"
            id="lastname"
            label="Last Name"
            type="text"
            variant="outlined"
            fullWidth
            // required={true}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            // required={true}
            error={errors.usernameErrorStatus}
            helperText={errors.usernameError}
            onChange={(e) => updateUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            // required={true}
            error={errors.emailErrorStatus}
            helperText={errors.emailError}
            onChange={(e) => updateEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            // required={true}
            error={errors.passwordErrorStatus}
            helperText={errors.passwordError}
            onChange={(e) => updatePassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            // required={true}
            error={errors.confirmPasswordErrorStatus}
            helperText={errors.confirmPasswordError}
            onChange={(e) => updateConfirmPassword(e.target.value)}
            onPaste={e => e.preventDefault()}
          />
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <Button className="submit-button" onClick={() => handleSubmit()}>Submit</Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            <Typography align="center">
              Already have an account?
            <button onClick={() => loginForm()}>Log in here.</button></Typography>
          </DialogContentText>
        </DialogContent>
    </>
  );
};

export default SignupForm;