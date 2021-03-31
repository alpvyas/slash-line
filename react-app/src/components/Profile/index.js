import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { NavLink, Redirect, useLocation } from "react-router-dom";
import { useHistory, useParams } from 'react-router';

const Profile = () => {
   const history = useHistory()
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(getNotes(user.id))
    //     dispatch(getNotebooks(user.id))
    // }, [dispatch])
    let user = useSelector(state => state.session.user)

  return (
    <div className="container page-container">
      <hi>Hello {user.first_name}</hi>
    </div>
  )
}

export default Profile;