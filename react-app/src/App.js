import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import { authenticate } from "./services/auth";
import { update_players } from "./store/players";
import Landing from "./components/Landing";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import MyTeam from "./components/MyTeam";
import Players from "./components/Players";
import Testing from "./components/Testing/";
import Stats from "./components/Stats";
import NotFound from "./components/NotFound";
import Dropzone from "./components/Dropzone";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  
  const players = useSelector(state => state.players.players);


  //calculating wait time for scheduled data update used in following useEffect/setTimeout
  const currentTime = new Date().getTime();
  const callTime = new Date().setHours(2,0,0,0);
  let waitTime;

  if (currentTime < callTime) {
    waitTime = callTime - currentTime;
  }else {
    waitTime = callTime + 86400000 - currentTime;
  }

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
