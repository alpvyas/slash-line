import React, { useState } from "react"
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import logo from "../../images/logo.png"
import baseball_grass from "../../images/baseball-grass.png";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import slash_line from "../../images/slash-line.png";
import "./splashNav.css"
import SidebarModal from "../Sidebar/SidebarModal";

const SplashNav = ({ setModal, handleSignup, handleLogin, handleSidebarModal, landing}) => {
  const user = useSelector(state => state.session.user);
  const onClick = (e, item) => {
  window.alert(JSON.stringify(item, null, 2));
  };

  return (
    <>
 
          <nav className="nav-bar" id="splash-nav">
          <div className="container nav-container">
            <div className="container logo-container">
              {landing && <img id="logo-image" alt="logo" src={logo} />}
              {!landing && <NavLink to="/" exact={true} className="inactive" activeClassName="active">
                  <img id="logo-image" alt="logo" src={logo} />
              </NavLink>}
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
              {!user && <div className="nav-link-tab" id="signup-tab">
                <button className="inactive" onClick={() => handleSignup()}>sign up</button>
              </div>}

              {user && <div className="nav-link-tab" id="leagues-tab">
                <NavLink to="/team" exact={true} className="inactive" activeClassName="active">
                  team
                </NavLink>
              </div>}
              <div className="slash-icon">/</div>
              {!user && <div className="nav-link-tab" id="login-tab">
                <button className="inactive" onClick={() => handleLogin()}>login</button>
              </div>}

              {user && <div className="nav-link-tab" id="players-tab">
                <NavLink to="/players" exact={true} className="inactive" activeClassName="active">
                  players
                </NavLink>
              </div>}
            </div>
            <div className="dropdown-container">
              <Sidebar setModal={setModal} handleSidebarModal={handleSidebarModal}/>
            </div>
          </div>
        </nav>
    </>
  )
}

export default SplashNav