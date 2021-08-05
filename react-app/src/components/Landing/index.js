import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import SplashNav from "../SplashNav";
import LandingModal from "../LandingModal";
import Footer from "../Footer";
import baseball_grass from "../../images/baseball-grass.png";
import "./landing.css";

const Landing = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const authenticated = useSelector(state => state.session.authenticated);
  const newUser = useSelector(state => state.session.newUser);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  const handleSignup = () => {
    if (login) setLogin(false);
    setSignup(true);
    setOpen(true);
  };

  const handleLogin = () => {
    if (signup) setSignup(false);
    setLogin(true);
    setOpen(true);
  };

  if (user && authenticated && !newUser) {
    return (
      <Redirect to="/home" />
    )
  };

  if (user && authenticated && newUser) {
    return (
      <Redirect to="/getting-started" />
    )
  };

  return (
    <div className="container page-container" style={{backgroundImage: `url(${baseball_grass})`}}>
        <LandingModal
          open={open}
          setOpen={setOpen}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
        />
        <div id="splash-container">
          <SplashNav handleLogin={handleLogin} handleSignup={handleSignup}/>
        </div>
      <Footer />
    </div>
  )
}

export default Landing;