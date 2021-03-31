import React, { useState } from "react"
import "./splashNav.css"

const SplashNav = () => {

  return (
    <>
      <nav className="nav-bar" id="splash-nav">
        <div className="container nav-container">
          <div className="container logo-container"></div>
          <div className="name-container">
            <div id="title">Slash Line</div>
          </div>
          <div className="container tab-container link-container">
            <div className="nav-link-tab" id="stats-tab">
              <button>.stats</button>
            </div>
            <div className="slash-icon">/</div>
            <div className="nav-link-tab" id="login-tab">
              <button>.sign up</button>
            </div>
            <div className="slash-icon">/</div>
            <div className="nav-link-tab" id="about-tab">
              <button>.login</button>
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