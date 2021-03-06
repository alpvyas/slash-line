import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink, Redirect, useLocation } from "react-router-dom";
import { useHistory, useParams } from 'react-router';
import Footer from "../Footer";
import Table from "../Table";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Zoom from '@material-ui/core/Zoom';
import { Typography } from '@material-ui/core';
import { getUserLeagues, setCurrentLeague, setSelectedTeam } from "../../store/leagues";
import { getUser } from '../../store/session';
import SplashNav from "../SplashNav";
import SidebarModal from "../Sidebar/SidebarModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainContent: {
    backgroundColor: 'yellow',
    height: '70vh',
    width: '90vw',
  },
  mainHeader: {
    backgroundColor: 'pink',
    height: '18vh',
    width: '100%',
  },
  avatar: {
    backgroundColor: 'grey',
    position: 'relative',
    height: '20vh',
    width: '20vh',
    bottom: '10vh',
    left: '1vw',
  },
  leagues: {
    backgroundColor: 'whitesmoke',
    position: 'relative',
    height: '30vh',
    width: '30vw',
    left: '57vw',
    bottom: '18vh',
  },
}));

const Profile = () => {
 
  const dispatch = useDispatch();
  
  const { id } = useParams();
  const user = useSelector(state => state.session.user)
  const leagues = useSelector(state => state.leagues.leagues);
  const profile = useSelector(state => state.session.profile);
  const [userProfile, setUserProfile] = useState("");
  const [checked, setChecked] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState("");

  const handleSidebarModal = () => {
    setSidebarOpen(true);
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getUserLeagues(id));
  }, []);

  const leaguesArray = []
  for (const league in leagues){
    leaguesArray.push(leagues[league].info)
  }

  const classes = useStyles();
  return (
    <>
      <SplashNav setModal={setModal} handleSidebarModal={handleSidebarModal}/>
      {profile && 
        <div className={classes.root}>
          <SidebarModal 
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          modal={modal}
        />
          <div className={classes.mainContent}>
            <Paper className={classes.mainHeader}></Paper>
            <Zoom in={true} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
              <Avatar className={classes.avatar}>{profile.user.first_name[0] + profile.user.last_name[0]}</Avatar>
            </Zoom>
            <Paper className={classes.leagues}>
              {Number(user.id) === Number(id) && <Typography>Your leagues: </Typography>}
              {Number(user.id) !== Number(id) && <Typography>{`${profile.user.username}'s leagues:`} </Typography>}
              <Table columns={["League Name"]} rows={leaguesArray} row_keys={["name"]}/>
            </Paper>
          </div>
          <Footer />
        </div>
      }
    </>
  )
}

export default Profile;