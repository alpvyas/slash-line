import React from "react";
import github_logo from "../../images/github-logo.png";
import linkedin_logo from "../../images/linkedin-logo.png";
import "./Footer.css";

const Footer = () => {

  return (
    <div className="footer-container">
      <div className="developer-container">
        <span style={{fontSize: '20px'}}>Developed by Alpesh Vyas</span>
      </div>
      <div className="link-container">
        <a href="https://github.com/alpvyas/slash-line">
          <div className="image-container">
            <img src={github_logo} alt="github-logo"></img>
            <span>GitHub Repo</span>
          </div>
        </a>
      </div>
      <div className="link-container">
        <a href="https://www.linkedin.com/in/alpesh-vyas-8211b9206/">
          <div className="image-container">
            <img src={linkedin_logo} alt="linkedin-logo"></img>
            <span>LinkedIn</span>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Footer;