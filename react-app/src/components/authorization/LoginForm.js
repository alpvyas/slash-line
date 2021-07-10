import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../../store/session';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './index.css';

const LoginForm = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const demoLogin = () => {
    const response = dispatch(login('demo@demo.com', 'password')).then(() => setAuthenticated(true));
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // const checkErrors = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = dispatch(login(username, email, password)).then((res) => {
      if (!res.errors) {
        setAuthenticated(true);
      } else {
        setErrors(res.errors);
      };
    } )
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
        <DialogContentText>
          To login, please enter your username or email address and your password.
        </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username or Email"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            Don't have an account? Create one here.
          </DialogContentText>
        </DialogContent>
    </>
  );
};

export default LoginForm;