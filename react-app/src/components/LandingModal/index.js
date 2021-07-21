import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import slashline_logo from "../../images/logo.png";
import LoginForm from '../authorization/LoginForm';
import SignupForm from '../authorization/SignupForm';
import Typography from '@material-ui/core/Typography';
import './LandingModal.css';

const LandingModal = ({ open, setOpen, signup, setSignup, login, setLogin}) => {

    const dispatch = useDispatch();

    // const [open, setOpen] = useState(true);
    // const [login, setLogin] = useState(true);
    // const [signup, setSignup] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const user = useSelector(state => state.session.user);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    // const openSignup = () => {
    //   if (toggleLogin) setToggleLogin(false);
    //   setToggleSignup(true);
    // };

    // const openLogin = () => {
    //   if (toggleSignup) setToggleSignup(true);
    //   setToggleLogin(true);
    // };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
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
        {login && <LoginForm setLogin={setLogin} setSignup={setSignup} />}

        {signup && <SignupForm setLogin={setLogin} setSignup={setSignup} />}
      </Dialog>
    </>
  );
};

export default LandingModal;