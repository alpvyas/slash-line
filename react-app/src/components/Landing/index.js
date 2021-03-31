import React, { useState } from "react";
import Modal from "react-modal";
import onClickOutside from 'react-onclickoutside';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import * as sessionActions from "../../store/session";
import SplashNav from "../SplashNav";
import Footer from "../Footer";

import logo from "../../images/logo.png"
import baseball_grass from "../../images/baseball-grass.png";
import "./landing.css";

const Landing = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);  

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
    <div className="container page-container">
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
          />
        </Modal>
        <div id="splash-container">
          <nav className="nav-bar" id="splash-nav">
          <div className="container nav-container">
            <div className="container logo-container">
              <img id="logo-image" alt="logo" src={logo} />
            </div>
            <div className="name-container">
              <div id="title">Slash Line</div>
            </div>
            <div className="container tab-container link-container">
              <div className="nav-link-tab" id="stats-tab">
                <button>stats</button>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="login-tab">
                <button onClick={openSignup}>sign up</button>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="about-tab">
                <button onClick={openLogin}>login</button>
              </div>
            </div>
            <div className="dropdown-container">
              <img src="https://img.icons8.com/windows/32/000000/menu--v2.png"/>
            </div>
          </div>
        </nav>
          <div className="container" id="mid-section">
            <img id="landing-image" alt="baseball-grass" src={baseball_grass} />
          </div>
        </div>
      <Footer />
    </div>
  )
}

export default Landing;