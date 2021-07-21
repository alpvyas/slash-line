import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { upload_files } from "../../store/uploads";
import LoginForm from "../authorization/LoginForm"
import SignupForm from "../authorization/SignupForm"
import LandingModal from "../LandingModal";

import Dropzone from '../Dropzone';
//Here are some comments about this component. Working with s3 is so wonky for me...why?



const Testing = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [files, setFiles] = useState("")

  const handleSave = async (e) => {
    e.preventDefault()
    console.log("FILES: ", files)
    const response = dispatch(upload_files(files));

    console.log("RESPONSE ", response)
  };

  const handleLogin = () => {
    const user = dispatch(login("demo@demo.com", "password"))
  }

  //   if (user) {
  //   return (
  //   <Redirect to="/team"/>
  // )}

  return (
    <>
      {/* <h1>Simple Flask AWS S3 Uploader</h1>

      <form onSubmit={(e) => handleSave(e)} >

        <label htmlFor="user_file">Upload Your File</label>
        <br></br>
        <input
          type="file"
          name="user_file"
          value={files}
          onChange={(e) => setFiles(e.target.value)}/>
        <br></br>
        <button type="submit">Upload</button>
      </form>

      <button type="button" onClick={() => handleLogin()}>LOGIN</button> */}

      <LandingModal />
    </>
  )

};

export default Testing;