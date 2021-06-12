import React, { useCallback, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
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

// const setPages = [Start, JoinLeague, JoinUserLeague, OpenLeagues, CreateTeam, Success, ]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  const [skipped, setSkipped] = useState(new Set());

  const steps = getSteps();

  // const [step, setStep] = useState(0);
  // const [formState, setFormState] = useState({});
  // const [steps, setSteps] = useState([
  //   { label: "Start", isValid: undefined},
  //   { label: "Join a League", isValid: undefined},
  //   { label: "Create Your Team", isValid: undefined},
  //   { label: "Confirm", isValid: undefined},
  // ]);

  // const lastStepIndex = steps.length - 1;
  // const isLastStep = lastStepIndex === step;
  const isStepOptional = step => {
    return step === 1;
  };
  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    isStepSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

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
    <>
      <div className="container page-container" style={{backgroundImage: `url(${ball_in_glove})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="middle-container">
          <Stepper activeStep={activeStep}>

            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps ={};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <>
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                </>
              );
            })}

          </Stepper>
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
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  {isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSkip}
                      className={classes.button}
                      >
                        Skip
                      </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default GettingStarted;