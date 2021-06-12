import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Start from './Start';
import JoinLeague from './JoinLeague';
import JoinUserLeague from './JoinUserLeague';
import OpenLeagues from './OpenLeagues';
import CreateTeam from './CreateTeam';
import Success from './Success';
import Footer from '../Footer';
import NavBar from '../NavBar';
import ball_in_glove from '../../images/baseball-glove-dirt.png';
import './GettingStarted.css';

const setPages = [Start, JoinLeague, JoinUserLeague, OpenLeagues, CreateTeam, Success, ]


const GettingStarted = () => {

  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState({});
  const [steps, setSteps] = useState([
    { label: "Start", isValid: undefined},
    { label: "Join a League", isValid: undefined},
    { label: "Create Your Team", isValid: undefined},
    { label: "Confirm", isValid: undefined},
  ]);

  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === step;
  const isPreviousStepValid = steps.slice(0, step)
                                   .findIndex(

    currentStep => currentStep.isValid === false
    
    ) === -1;

    const onStepSubmit = useCallback(
      event => {
        const { isValid, values } = event;

        const currentSteps = steps.map((currentStep, index) => ({
          ...currentStep,
          isValid: index === step ? isValid : currentStep.isValid,
        }));
      });


  return (
    <>
      <div className="container page-container" style={{backgroundImage: `url(${ball_in_glove})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="middle-container">
          <form>
            <Step1 step={step} setStep={setStep} join={join} setJoin={setJoin}/>
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