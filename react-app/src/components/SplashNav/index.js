import React, { useState } from "react"
import { NavLink, Redirect } from "react-router-dom";
import Sidebar from "../Sidebar";
import logo from "../../images/logo.png"
import baseball_grass from "../../images/baseball-grass.png";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import slash_line from "../../images/slash-line.png";
import "./splashNav.css"

const SplashNav = ({ setModal, handleSignup, handleLogin, handleSidebarModal}) => {

  const onClick = (e, item) => {
  window.alert(JSON.stringify(item, null, 2));
  };

  return (
    <>
 
          <nav className="nav-bar" id="splash-nav">
          <div className="container nav-container">
            <div className="container logo-container">
              <img id="logo-image" alt="logo" src={logo} />
            </div>
            <div className="name-container">
              <div id="title" alt="slash-line">Slash Line Baseball</div>
            </div>
            <div className="tab-container">
              <div className="nav-link-tab" id="stats-tab">
                <NavLink to="/stats" exact={true} className="inactive" activeClassName="active">
                  stats
                </NavLink>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="signup-tab">
                <button className="inactive" onClick={() => handleSignup()}>sign up</button>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="login-tab">
                <button className="inactive" onClick={() => handleLogin()}>login</button>
              </div>
            </div>
            <div className="dropdown-container">
              <Sidebar setModal={setModal} handleSidebarModal={handleSidebarModal}/>
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