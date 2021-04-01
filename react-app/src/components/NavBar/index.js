import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink, Redirect } from "react-router-dom";
import logo from "../../images/logo.png"
import Dropdown from "../Dropdown";
import LogoutButton from "../auth/LogoutButton";
import Sidebar from "../Sidebar";
import "./NavBar.css";

const NavBar = () => {
  const [user, setUser] = useState({});
  const { user_id }  = useParams();
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (!user.id) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${user.id}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [user.id]);

  if (!user) {
    return null;
  }
  return (
    <>
      <nav className="nav-bar" id="main-nav">
          <div className="container nav-container">
            <div className="container logo-container">
              <NavLink to="/" exact={true} className="inactive" activeClassName="active">
                  <img id="logo-image" alt="logo" src={logo} />
              </NavLink>
            </div>
            <div className="name-container">
              <div id="title">Slash Line</div>
            </div>
            <div className="container tab-container link-container">
              <div className="nav-link-tab" id="stats-tab">
                <NavLink to="/stats" exact={true} className="inactive" activeClassName="active">
                  stats
                </NavLink>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="leagues-tab">
                <NavLink to="/leagues" exact={true} className="inactive" activeClassName="active">
                  leagues
                </NavLink>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="players-tab">
                <NavLink to="/players" exact={true} className="inactive" activeClassName="active">
                  players
                </NavLink>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="profile-tab">
                <NavLink to={`/users/${user_id}`} exact={true} className="inactive" activeClassName="active">
                  profile
                </NavLink>
              </div>
            </div>
            <div className="dropdown-container">
              {/* <Dropdown items={["About", "Coming Soon", "Feedback", <LogoutButton />]}/> */}
              {(showSidebar)?<Sidebar setShowSidebar={setShowSidebar}/>:null}
                <div className="hamburgerBtn" onClick={()=>setShowSidebar(true)}>
                  <i className="fas fa-bars" ></i>
              </div>
            </div>
          </div>
        </nav>
    </>
  )
}

export default NavBar;