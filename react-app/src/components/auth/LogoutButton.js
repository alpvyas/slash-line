import React from "react";
import {logout} from "../../store/session"
import { NavLink, Redirect, useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()
  let history = useHistory()
  const onLogout = async (e) => {
    e.preventDefault();
   const response = await dispatch(logout());
  if (response) history.replace("/")

  // return <Redirect to ="/" ></Redirect>
  };

  return (
    <button id="Logout-Button" onClick={onLogout}>Logout
    </button>
  );
};

export default LogoutButton;
