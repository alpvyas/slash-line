import { Table } from "@material-ui/core";
import React from "react";
import "./Container.css";

const Alert = (data) => {
  
  return (
    <>
      <div className="alert-container container">
        <div className="alert-icon">
          <i />
        </div>
        <div className="alert-body">
          <div className="alert-content">
            <p></p>
            <div className="alert-footer">
              <div className="form-field"></div>
              <button className="alert-action-button"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export const Standings = (data) => {
  
  const headers = ["Rank", "Team", "Points"]
  //need to get teams that belong to league
  //need to sort/rank the teams by points

  return (
    <>
      <div className="standings-container container">
        <Table columns={headers} />
      </div>
    </>  
  )
};

export const Notices = () => {
  
  return (
    <>
      <div className="notices-container container">
        <div className="notice-container-header">
          <div className="header-text">
            <h3>NOTICE</h3>
          </div>
          <div className="settings-container">
            <button></button>
          </div>
        </div>
      </div>
    </>
  )
};


export default Alert;