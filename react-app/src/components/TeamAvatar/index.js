import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import './TeamAvatar.css';


const TeamAvatar = ({ updateColors, logo, mlbTeams }) => {
  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  };

  return (
    <>
      <button className="avatar-container" onClick={() => updateColors(getKeyByValue(mlbTeams, logo))}>
        <Avatar className="team-avatar" alt='team-logo' src={logo} style={{height: '150px', width: '150px'}}/>
      </button>
    </>
  )
};

export default TeamAvatar;