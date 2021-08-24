import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink, Redirect, useLocation } from "react-router-dom";
import { useHistory, useParams } from 'react-router';
import NavBar from "../NavBar";
import Footer from "../Footer";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    width: '100vw',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Profile = () => {
 
  const dispatch = useDispatch();
  const { profileId } = useParams();
  const user = useSelector(state => state.session.user)

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <NavBar />

        <Footer />
      </div>
    </>
  )
}

export default Profile;