import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import logo from "../../images/logo.png"
import Sidebar from "../Sidebar";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const { user_id }  = useParams();
  const [showSidebar, setShowSidebar] = useState(false)

  const onClick = (e, item) => {
  window.alert(JSON.stringify(item, null, 2));
  };


  const profile = { name: "profile", label: "Profile", onClick };

  const settings = {
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
    };

  let items = [
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
  ]
  

  // useEffect(() => {
  //   if (!user.id) {
  //     return
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${user.id}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [user.id]);

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
              <Sidebar  user={user} items={items}/>
            </div>
          </div>
        </nav>
    </>
  )
}

export default NavBar;