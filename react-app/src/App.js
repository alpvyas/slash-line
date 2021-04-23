import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import { authenticate } from "./services/auth";
import { get_roster_40, teams } from "./store/players";
import { get_stats_from_backend } from "./store/stats";
import Landing from "./components/Landing";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import MyTeam from "./components/MyTeam";
import Players from "./components/Players";
import Testing from "./components/Testing/";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  
  const players = useSelector(state => state.players.players);
  
  // const userTeam = useSelector(state => state.userTeam.userTeam);
  // const injuredPlayers = useSelector(state => state.injuredList.injuredList);
  
  // useEffect(() => {
  //   teams.forEach((team) => {
  //     dispatch(get_roster_40(team.id))
  //     })
  
  //   }, [])
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
