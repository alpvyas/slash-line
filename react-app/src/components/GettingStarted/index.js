import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Step1 from './Step1';
import JoinLeague from './JoinLeague';
import JoinUserLeague from './JoinUserLeague';
import CreateTeam from './CreateTeam';
import Success from './Success';
import OpenLeagues from './OpenLeagues';
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
          <form>
            <Step1 currentStep={step} setStep={setStep}/>
          </form>
          {/* <JoinLeague currentStep={step} setStep={setStep}/> */}
          {/* <JoinUserLeague currentStep={step} setStep={setStep}/> */}
          {/* <CreateTeam currentStep={step} setStep={setStep}/> */}
          {/* <Success currentStep={step} setStep={setStep}/> */}
          {/* <OpenLeagues currentStep={step} setStep={setStep}/> */}
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default GettingStarted;