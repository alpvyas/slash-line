import React from "react";
import {logout} from "../../store/session"
import { NavLink, useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()
  let history = useHistory()
  const onLogout = (e) => {
   dispatch(logout())
   history.replace("/")
  };

  return (
    <button id="Logout-Button" onClick={onLogout}>
      <NavLink to="/">Logout</NavLink>
    </button>
  );
};

export default LogoutButton;
