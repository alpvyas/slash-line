import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import * as sessionActions from "../../store/session";
import SplashNav from "../SplashNav";
import LandingModal from "../LandingModal";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

import logo from "../../images/logo.png";
import baseball_grass from "../../images/baseball-grass-full.png";
import "./landing.css";

const Landing = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const authenticated = useSelector(state => state.session.authenticated);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);
  // const [showSidebar, setShowSidebar] = useState(false); 

  Modal.setAppElement("#root");
  // const closeSignup = () => {
  //   setSignup(false);
  // };

  // const closeLogin = () => {
  //   if (signup) setSignup(false);
  //   setLogin(false);
  // };

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

  if (user && authenticated) {
    return (
      <Redirect to="/home" />
    )
  };

  return (
    <div className="container page-container" style={{backgroundImage: `url(${baseball_grass})`}}>
      {/* <Modal
        isOpen={signup}
        contentLabel="Sign up"
        className="defaultInner"
        overlayClassName="defaultOuter"
        onRequestClose={closeSignup}
        >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" onClick={(e) => setSignup(false)}>
            <i className="fas fa-times closeIco"></i>
          </button>
        </div>
        <SignUpForm
          // authenticated={authenticated}
          // setAuthenticated={setAuthenticated}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
          />
      </Modal>
      <Modal
        isOpen={login}
        contentLabel="Login"
        className="defaultInner"
        overlayClassName="defaultOuter"
        onRequestClose={closeLogin}
        >
          <div className="closeIcoOuterShell">
            <button className="closeIcoShell" onClick={(e) => setLogin(false)}>
              <i className="fas fa-times closeIco"></i>
            </button>
          </div>
          <LoginForm
          // authenticated={authenticated}
          // setAuthenticated={setAuthenticated}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
          openLogin={openLogin}
          // demoLogin={demoLogin}
          />
        </Modal> */}
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