import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import logo from "../../images/logo.png"
import Sidebar from "../Sidebar";

const NavBar = ({ setModal, handleSidebarModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const { user_id }  = useParams();
  const [showSidebar, setShowSidebar] = useState(false)


  const onClick = (e, item) => {
  window.alert(JSON.stringify(item, null, 2));
  };

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
              <div id="title">Slash Line Baseball</div>
            </div>
            <div className="container tab-container link-container">
              <div className="nav-link-tab" id="stats-tab">
                <NavLink to="/stats" exact={true} className="inactive" activeClassName="active">
                  stats
                </NavLink>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="leagues-tab">
                <NavLink to="/team" exact={true} className="inactive" activeClassName="active">
                  team
                </NavLink>
              </div>
              <div className="slash-icon">/</div>
              <div className="nav-link-tab" id="players-tab">
                <NavLink to="/players" exact={true} className="inactive" activeClassName="active">
                  players
                </NavLink>
              </div>
            </div>
            <div className="dropdown-container">
              <Sidebar  user={user} setModal={setModal} handleSidebarModal={handleSidebarModal}/>
            </div>
          </div>
        </nav>
    </>
  )
}

export default NavBar;