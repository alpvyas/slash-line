import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import { authenticate } from "./services/auth";
import { get_players, seedPlayers, update_players } from "./store/players";
import { get_stats } from "./store/stats";
import Landing from "./components/Landing";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import UserTeam from "./components/UserTeam";
import Players from "./components/Players";
import Testing from "./components/Testing/";
import Stats from "./components/Stats";
import NotFound from "./components/NotFound";
import { get_game_details_backend } from "./store/gameDetails";
import Dropzone from "./components/Dropzone";
import GettingStarted from "./components/GettingStarted";


function App() {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const deployed = useSelector(state => state.session.deployed);


  if (!deployed) {
    const update = dispatch(update_players());

    if (update) {
      dispatch(sessionActions.deployStatus())
    }
  }

  //calculating wait time for scheduled data update used in following useEffect/setTimeout
  const currentTime = new Date().getTime();
  const callTime = new Date().setHours(2,0,0,0);
  let waitTime;

  if (currentTime < callTime) {
    waitTime = callTime - currentTime;
  }else {
    waitTime = callTime + 86400000 - currentTime;
  };

  //sets up data update scheduled for each night at 2AM PST
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(update_players())

      setInterval(() => {
        dispatch(update_players())
      }, 86400000)
    }, waitTime)
    return () => clearTimeout(timer)
  }, [])
 
  useEffect(() => {
    dispatch(get_players())
    }, [])

  useEffect(() => {
      dispatch(get_stats())
    }, []);


  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  for (let index = 0; index < months.length; index++) {
    if (month === index) month = months[index]
  };

  if (day < 10) day = `0${day}`;

  const today = year + '-' + month + '-' + day;

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(get_game_details_backend(today))

  //     setInterval(() => {
  //       dispatch(get_game_details_backend(today))
  //     }, 60000)
  //   }, 10000)
  //   return () => clearTimeout(timer)
  // }, [])
  
  // const userTeam = useSelector(state => state.userTeam.userTeam);
  // const injuredPlayers = useSelector(state => state.injuredList.injuredList);
  
  // useEffect(() => {
  //   teams.forEach((team) => {
  //     dispatch(get_roster_40(team.id))
  //     })
  
  //   }, [dispatch])

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(()=>{
    dispatch(sessionActions.restoreUser())
    .then(()=> setLoaded(true))
    
  },[dispatch])

  if (!loaded) {
    return null;
  };

  

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/testing" exact={true}>
          <Testing />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <ProtectedRoute exact path="/getting-started" authenticated={authenticated}>
          <GettingStarted />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home" authenticated={authenticated}>
          <Homepage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/users/:profileId" authenticated={authenticated}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/myteam" authenticated={authenticated}>
          <UserTeam />
        </ProtectedRoute>
        <Route exact path="/players">
          <Players />
        </Route>
        <ProtectedRoute exact path="/team" authenticated={authenticated}>
          <UserTeam />
        </ProtectedRoute>
        <Route exact path="/stats">
          <Stats />
        </Route>
        <Route exact path="/not-found">
          <NotFound />
        </Route>
        <Route exact path="/upload">
          <Dropzone />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
