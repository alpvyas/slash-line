import React, { useState, useEffect, useMemo, memo }from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './MaterialHomepage.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MaterialHomepage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const classes = useStyles();


  return (
    <>
      <div className={classes.root}>

        <Grid container>
          <Grid container>
            <Grid item xs>
              <Paper className={classes.paper}>hello</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>world</Paper>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Paper className={classes.paper}>i'm</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>alpesh</Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default memo(MaterialHomepage);