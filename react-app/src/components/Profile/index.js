import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink, Redirect, useLocation } from "react-router-dom";
import { useHistory, useParams } from 'react-router';
import NavBar from "../NavBar";

const Profile = () => {
   const history = useHistory()
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)

  return (
    <div className="container page-container">
      {/* <NavBar /> */}
      <div>
        <h2>Hello {user["first_name"]}!</h2>
      </div>
    </div>
  )
}

export default Profile;