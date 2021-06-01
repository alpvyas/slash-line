import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink, Redirect, useLocation } from "react-router-dom";
import { useHistory, useParams } from 'react-router';
import NavBar from "../NavBar";

const Profile = () => {
 
  const dispatch = useDispatch();
  const { profileId } = useParams();
  const user = useSelector(state => state.session.user)

  return (
    <>
      <div className="container page-container">
        {/* <NavBar /> */}
        <div>
          {user && <h2>Hello {user.first_name}!</h2>}
          {user && <h3>This is the user ID: {user.id}</h3>}
          <h2>This is the profile ID: {profileId} </h2>
        </div>
      </div>
    </>
  )
}

export default Profile;