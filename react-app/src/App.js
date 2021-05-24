import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import { authenticate } from "./services/auth";
import { get_roster_40, teams, update_players } from "./store/players";
import { get_stats_from_backend, update_season_stats } from "./store/stats";
import Landing from "./components/Landing";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import MyTeam from "./components/MyTeam";
import Players from "./components/Players";
import Testing from "./components/Testing/";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

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

  console.log("WAIT TIME: ", waitTime)

  // setTimeout(() => {
  //   console.log("I'M IN SET TIMEOUT")
  //   console.log("BEFORE FIRST DISPATCH CALL")
  //   dispatch(update_players())
  //   console.log("AFTER FIRST DISPATCH CALL")
  //   setInterval(() => {
  //     console.log("INSIDE SET INTERVAL")
  //     console.log("BEFORE DISPATCH CALL")
  //     dispatch(update_players())
  //     console.log("AFTER DISPATCH CALL")
  //   }, 600000)
  // }, 10000)

useEffect(() => {
  const timer = setTimeout(() => {
    dispatch(update_players())

    setInterval(() => {
      dispatch(update_players())
    }, 600000)
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

  // useEffect(() => {
  //   dispatch(get_roster_40())
  //   }, [dispatch])

    
    // useEffect(() => {
    //   dispatch(get_stats_from_backend())
    // }, [dispatch]);

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
          {/* <MyTeam /> */}
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
