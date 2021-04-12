import React, { useState } from "react"
import { NavLink, Redirect } from "react-router-dom";
import Sidebar from "../Sidebar";
import logo from "../../images/logo.png"
import baseball_grass from "../../images/baseball-grass.png";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import slash_line from "../../images/slash-line.png";
import "./splashNav.css"

const SplashNav = ({showSidebar, setShowSidebar, openSignup, openLogin}) => {

  const onClick = (e, item) => {
  window.alert(JSON.stringify(item, null, 2));
  };

  const items = [
    {
      name: "about",
      label: "About",
      items: [
        {name: "what-is", label: "What is Slash Line?", onClick},
        {name: "how-to", label: "How to play", onClick},
        {name: "thanks", label: "Thanks", onClick},
      ],
    },
    {
      name: "coming-soon", 
      label: "Coming Soon",
      items: [
        { name: "baseline", label: "Down the Baseline", onClick },
        { name: "feedback", label: "Feedback", onClick },
      ],
    },
    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      items: [
        { 
          name: "display",
          label: "Display",
          items: [
            {name: "dark-mode", label: "Dark Mode", onClick}
          ],
        },
        {
          name: "notifications",
          label: "Notifications",
          Icon: NotificationsIcon,
          items: [
            {name: "email", label: "Email", onClick},
            {name: "mobile", label: "Text message", onClick}
          ],
        },
      ]
    },
  ]

  return (
    <>
      {/* {(showSidebar)?<Sidebar setShowSidebar={setShowSidebar}/>:null} */}
          <nav className="nav-bar" id="splash-nav">
          <div className="container nav-container">
            <div className="container logo-container">
              <img id="logo-image" alt="logo" src={logo} />
            </div>
            <div className="name-container">
              <div id="title" alt="slash-line">Slash Line</div>
              {/* <img id="logo-image" alt="logo" src={slash_line} /> */}
            </div>
            <div className="tab-container">
              <div className="nav-link-tab" id="stats-tab">
                <NavLink to="/stats" exact={true} className="inactive" activeClassName="active">
                  stats
                </NavLink>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="signup-tab">
                <button className="inactive" onClick={openSignup}>sign up</button>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="login-tab">
                <button className="inactive" onClick={openLogin}>login</button>
              </div>
            </div>
            <div className="dropdown-container">
              <Sidebar items={items}/>
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