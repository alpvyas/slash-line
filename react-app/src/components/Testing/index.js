import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload_files } from "../../store/uploads";

import Dropzone from '../Dropzone';
//Here are some comments about this component. Working with s3 is so wonky for me...why?



const Testing = () => {
  const dispatch = useDispatch();

  const [files, setFiles] = useState("")

  const handleSave = async (e) => {
    e.preventDefault()
    console.log("FILES: ", files)
    const response = dispatch(upload_files(files));

    console.log("RESPONSE ", response)
  };

  return (
    <>
      <h1>Simple Flask AWS S3 Uploader</h1>

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
    </>
  )

};

export default Testing;