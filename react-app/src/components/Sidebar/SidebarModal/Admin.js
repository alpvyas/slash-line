import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

const Admin = ({ setLogin, setSignup }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const demoLogin = () => {
    dispatch(login('Demo', 'demo@demo.com', 'password'));
  };

  const updateUsername = (userName) => {
    if (validateEmail(userName)) {
      setEmail(userName);
    } else {
      setUsername(userName);
    }
  };

  const updatePassword = (password) => {
    setPassword(password);
  };

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!(regex.test(String(email).toLowerCase()))) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(username, email, password))
    .then((res) => {
      if (res.errors) {
        setErrors({...errors, message: res.errors});
      };
    });
  };

  return (
    <>
        <DialogContent>
        <DialogContentText>
          <Typography variant="h6" align="center">To login as an Administrator, please enter your username or email address and password.</Typography>

          {errors && <Typography variant="h6" align="center" style={{color: 'red'}}>{ errors.message }</Typography>}
        </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username or Email"
            type="text"
            style={{width: '53vh', align: 'center'}}
            onChange={(e) => updateUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            style={{width: '53vh'}}
            onChange={(e) => updatePassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <Button className="submit-button" onClick={(e) => handleSubmit(e)}>Submit</Button>
          <Button style={{textAlign: 'center'}}className="submit-button" onClick={(e) => demoLogin(e)}>Demo Admin</Button>
        </DialogActions>
    </>
  );
};

export default Admin;