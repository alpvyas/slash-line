import React, { useState } from "react";
import SplashNav from "../SplashNav";
import Footer from "../Footer";
import baseball_grass from "../../images/baseball-grass.png";
import "./landing.css";

const Landing = () => {

  return (
    <div className="container page-container">
      <SplashNav />
      
      <div id="splash-container">
        <div className="container" id="mid-section">
          <img id="landing-image" alt="baseball-grass" src={baseball_grass} />
        </div>
        
      </div>
      <Footer />
    </div>
  )
}

export default Landing;