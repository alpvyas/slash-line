import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

// const setPages = [Start, JoinLeague, JoinUserLeague, OpenLeagues, CreateTeam, Success, ]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '1000px',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: '0px',
  },
}));

const getSteps = () => {
  return ["Start", "Join a league", "Create your team", "Review", "Finished"];
};

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Start />
    case 1:
      return <JoinLeague />
    case 2:
      return <CreateTeam />
    // case 3:
    //   return <Review />
    // case 4:
    //   return <Finished />
    default:
      return <Start />
  }
};


const GettingStarted = () => {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  // const [skipped, setSkipped] = useState(new Set());

  const steps = getSteps();

  // const isStepOptional = step => {
  //   // return step === 1;
  //   return false;
  // };
  // const isStepSkipped = step => {
  //   return skipped.has(step);
  // };

  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     throw new Error("You can't skip a step that isn't optional.")
  //   }

  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  //   isStepSkipped(prevSkipped => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  // const onStepSubmit = useCallback(
  //     event => {
  //       const { isValid, values } = event;

  //       const currentSteps = steps.map((currentStep, index) => ({
  //         ...currentStep,
  //         isValid: index === step ? isValid : currentStep.isValid,
  //       }));

  //       setSteps(currentSteps);

  //       if (!isValid) {
  //         return;
  //       }

  //       setStep(() => Math.min(step + 1, lastStepIndex));
  //       setFormState(values);

  //       if (isLastStep) {
  //         alert(JSON.stringify(values));
  //       }
  //     },
  //     [step, steps, setStep, setSteps, setFormState, isLastStep]
  //   );

    // const onPrevClick = useCallback(
    //   (event) => {
    //     event.preventDefault();
    //     setStep(() => Math.max(step - 1, 0));
    //   },
    //   [step, setStep]
    // );

  return (
      <div className="container page-container" style={{backgroundImage: `url(${ball_in_glove})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="get-started-container">
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  You're All Set!
                </Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography component={'span'} className={classes.instructions}>
                  <div className="card">
                    {getStepContent(activeStep)}
                  </div>
                <div className="navigation-buttons">
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    >
                    Back
                  </Button>
                  {/* {isStepOptional(activeStep) && ( */}
                    {/* <Button
                      variant="contained"
                      color="primary"
                      // onClick={handleSkip}
                      className={classes.button}
                      >
                        Skip
                      </Button> */}
                  {/* )} */}

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
  );
};

export default GettingStarted;