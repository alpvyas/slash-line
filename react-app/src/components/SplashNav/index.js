import React, { useState } from "react"
import logo from "../../images/logo.png"
import LoginModal from "../Login";
import "./splashNav.css"

const SplashNav = () => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  const openSignup = () => {
    if (login) setLogin(false);
    setSignup(true);
  };

  const openLogin = () => {
    if (signup) setSignup(false);
    setLogin(true);
  };

  return (
    <>
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
    </>
  )
}

export default SplashNav