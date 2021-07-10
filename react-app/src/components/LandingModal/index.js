import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import Dialog from '@material-ui/core/Dialog';
import slashline_logo from "../../images/logo.png";
import './LandingModal.css';

const LandingModal = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleSignup, setToggleSignup] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const user = useSelector(state => state.session.user);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const openSignup = () => {
      if (toggleLogin) setToggleLogin(false);
      setToggleSignup(true);
    };

    const openLogin = () => {
      if (toggleSignup) setToggleSignup(true);
      setToggleLogin(true);
    };

    const demoLogin = () => {
      const user = dispatch(login('demo@demo.com', 'password')).then(() => setAuthenticated(true));
    };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >

      </Dialog>
    </>
  );
};

export default LandingModal;