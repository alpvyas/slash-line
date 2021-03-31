import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import User from "./components/User";
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
      {/* <NavBar setAuthenticated={setAuthenticated} /> */}
      {/* {(user)?<NavBar />:null} */}

      <Switch>
        {/* <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route> */}
        <Route path="/" exact={true}>
          <Landing />
        </Route>
        <Route path="/home" exact={true}>
          <Homepage />
        </Route>
        {/* <ProtectedRoute path="/home" exact={true} authenticated={authenticated}>
          <Homepage />
        </ProtectedRoute> */}
        <ProtectedRoute path="/users/:id" exact={true} authenticated={authenticated}>
          <Profile user={user}/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
