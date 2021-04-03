import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import { authenticate } from "./services/auth";
import Landing from "./components/Landing";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

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
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Landing />
        </Route>
        <Route path="/home" exact={true}>
          <Homepage />
        </Route>
        <ProtectedRoute path="/users/:id" exact={true} authenticated={authenticated}>
          <Profile />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
