import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Step1 from './Step1';
import JoinLeague from './JoinLeague';
import JoinUserLeague from './JoinUserLeague';
import CreateTeam from './CreateTeam';
import Footer from '../Footer';
import NavBar from '../NavBar';
import ball_in_glove from '../../images/baseball-glove-dirt.png';
import './GettingStarted.css';


const GettingStarted = () => {

  const [step, setStep] = useState("first");

  return (
    <>
      <div className="container page-container" style={{backgroundImage: `url(${ball_in_glove})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="middle-container">
          {/* <Step1 /> */}
          {/* <JoinLeague /> */}
          {/* <JoinUserLeague /> */}
          <CreateTeam />
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default GettingStarted;