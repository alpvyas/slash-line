import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import { authenticate } from "./services/auth";
import { get_players, get_roster_40, teams, update_players } from "./store/players";
import { get_stats, get_stats_from_backend, update_season_stats } from "./store/stats";
import Landing from "./components/Landing";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import MyTeam from "./components/MyTeam";
import Players from "./components/Players";
import Testing from "./components/Testing/";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { get_game_details, get_game_details_backend } from "./store/gameDetails";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  
  const players = useSelector(state => state.players.players);

  const currentTime = new Date().getTime();
  const callTime = new Date().setHours(2,0,0,0);
  let waitTime;

  if (currentTime < callTime) {
    waitTime = callTime - currentTime;
  }else {
    waitTime = callTime + 86400000 - currentTime;
  }

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

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(get_game_details_backend(today))

      setInterval(() => {
        dispatch(get_game_details_backend(today))
      }, 60000)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])
  
  // const userTeam = useSelector(state => state.userTeam.userTeam);
  // const injuredPlayers = useSelector(state => state.injuredList.injuredList);
  
  // useEffect(() => {
  //   teams.forEach((team) => {
  //     dispatch(get_roster_40(team.id))
  //     })
  
  //   }, [dispatch])
  // useEffect(() => {
  //   (async() => {
  //     const user = await authenticate();
  //     if (!user.errors) {
  //       setAuthenticated(true);
  //     }
  //     setLoaded(true);
  //   })();
  // }, []);
    

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
        <Route exact path="/home">
          <Homepage />
        </Route>
        <ProtectedRoute exact path="/users/:id" authenticated={authenticated}>
          <Profile />
        </ProtectedRoute>
        <Route exact path="/myteam">
          <MyTeam />
        </Route>
        <Route exact path="/players">
          <Players />
        </Route>
        <Route exact path="/team">
          <MyTeam />
        </Route>
        <Route exact path="/stats">
          <Stats />
        </Route>
        <Route exact path="not-found">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
