import React, { useState } from "react"
import { NavLink } from "react-router-dom";
import "./splashNav.css"

const SplashNav = () => {

  return (
    <nav className="nav-bar" id="splash-nav">
      <div className="container nav-container">
        <div className="container logo-container"></div>
        <div className="name-container">
          <div id="title">Slash Line</div>
        </div>
        <div className="container tab-container link-container">
          <div className="nav-link-tab" id="stats-tab">
            <NavLink to="/stats" exact={true}
            className="inactive"
            activeClassName="active">
            stats
            </NavLink>
          </div>
          <div className="slash-icon">/</div>
          <div className="nav-link-tab" id="login-tab">
            <NavLink to="/signup" exact={true}
            className="inactive"
            activeClassName="active">
            sign up
            </NavLink>
          </div>
          <div className="slash-icon">/</div>
          <div className="nav-link-tab" id="about-tab">
            <NavLink to="/login" exact={true}
            className="inactive"
            activeClassName="active">
            login
            </NavLink>
          </div>
        </div>
        <div className="dropdown-container">
          <img src="https://img.icons8.com/windows/32/000000/menu--v2.png"/>
        </div>
      </div>
    </nav>
  )
}

export default SplashNav