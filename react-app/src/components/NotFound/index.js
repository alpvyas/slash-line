import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import bellinger from "../../images/bellinger.png";
import "./NotFound.css";

const NotFound = () => {

  return (
    <>
      <NavBar />
      <div className="container image-container">
        <img alt="bellinger" src={bellinger} />
      </div>
      <Footer />
    </>
  )
};

export default NotFound;