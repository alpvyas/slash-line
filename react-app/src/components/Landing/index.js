import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import * as sessionActions from "../../store/session";
import SplashNav from "../SplashNav";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

import logo from "../../images/logo.png";
import baseball_grass from "../../images/baseball-grass-full.png";
import "./landing.css";

const Landing = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  // const [showSidebar, setShowSidebar] = useState(false); 

  Modal.setAppElement("#root");
  const closeSignup = () => {
    setSignup(false);
  };

  const closeLogin = () => {
    if (signup) setSignup(false);
    setLogin(false);
  };

  const openSignup = () => {
    if (login) setLogin(false);
    setSignup(true);
  };

  const openLogin = () => {
    if (signup) setSignup(false);
    setLogin(true);
  };

  const demoLogin = () => {
    const user = dispatch(sessionActions.login("demo@demo.com", "password"));
    setAuthenticated(true);
  };

  if (user) {
    return (
      <Redirect to="/home" />
    )
  };

  return (
    <div className="container page-container" style={{backgroundImage: `url(${baseball_grass})`}}>
      <Modal
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
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
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
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
          openLogin={openLogin}
          demoLogin={demoLogin}
          />
        </Modal>
        <div id="splash-container">
          <SplashNav openLogin={openLogin} openSignup={openSignup}/>
        </div>
      <Footer />
    </div>
  )
}

export default Landing;