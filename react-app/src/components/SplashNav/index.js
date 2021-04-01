import React, { useState } from "react"
import LoginModal from "../Login";
import Dropdown from "../Dropdown";
import Sidebar from "../Sidebar";
import logo from "../../images/logo.png"
import baseball_grass from "../../images/baseball-grass.png";
import "./splashNav.css"

const SplashNav = ({showSidebar, setShowSidebar, openSignup, openLogin}) => {

  return (
    <>
      {(showSidebar)?<Sidebar setShowSidebar={setShowSidebar}/>:null}
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
    </>
  )
}

export default SplashNav