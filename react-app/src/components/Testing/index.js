import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { upload_files } from "../../store/uploads";
import LoginForm from "../authorization/LoginForm"
import SignupForm from "../authorization/SignupForm"
import LandingModal from "../LandingModal";
import StartWizard from "../StartWizard";
import TeamAvatar from "../TeamAvatar";
import Grid from '@material-ui/core/Grid';
import { ARI, ATL, BAL, BOS, CHC, CIN, CLE, COL, CWS, DET, HOU, KC, LAA, LAD, MIA, MIL, MIN, NYM, NYY, OAK, PHI, PIT, SD, SEA, SF, STL, TB, TEX, TOR, WSH } from '../../images';

import Dropzone from '../Dropzone';
import MaterialHomepage from "../MaterialHomepage";



const Testing = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [file, setFile] = useState("")

  const handleUpload = async (e) => {
    e.preventDefault()
    console.log("FILE: ", file)
    const data = new FormData();
    data.append('image', file, file.name)
    console.log("DATA: ", data.get('image'))
    const response = dispatch(upload_files(data));

    console.log("RESPONSE ", response)
  };

  const handleSelect = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleLogin = () => {
  //   const user = dispatch(login("demo@demo.com", "password"))
  // }

  //   if (user) {
  //   return (
  //   <Redirect to="/team"/>
  // )}

  // const mlbTeams = [ARI, ATL, BAL, BOS, CHC, CIN, CLE, COL, CWS, DET, HOU, KC, LAA, LAD, MIA, MIL, MIN, NYM, NYY, OAK, PHI, PIT, SD, SEA, SF, STL, TB, TEX, TOR, WSH];

  return (
    <>
      {/* <h1>Simple Flask AWS S3 Uploader</h1>

      <form onSubmit={(e) => handleUpload(e)} >

        <label htmlFor="user_file">Upload Your File</label>
        <br></br>
        <input
          type="file"
          name="file"
          onChange={(e) => handleSelect(e)}/>
        <br></br>
        <button type="submit">Upload</button>
      </form> */}
  
      {/* <StartWizard /> */}

      <MaterialHomepage />
      
    </>
  )

};

export default Testing;