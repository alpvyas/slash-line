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

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

// const useColorlibStepIconStyles = makeStyles({
//   root: {
//     backgroundColor: '#ccc',
//     zIndex: 1,
//     color: '#fff',
//     width: 50,
//     height: 50,
//     display: 'flex',
//     borderRadius: '50%',
//     // justifyContent: 'space-around',
//     // alignItems: 'space-around',
//   },
//   active: {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
//   },
//   completed: {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//   },
// });

// function ColorlibStepIcon(props) {
//   const classes = useColorlibStepIconStyles();
//   const { active, completed } = props;

//   const icons = {
//     1: <SettingsIcon />,
//     2: <GroupAddIcon />,
//     3: <VideoLabelIcon />,
//   };

//   return (
//     <div
//       className={clsx(classes.root, {
//         [classes.active]: active,
//         [classes.completed]: completed,
//       })}
//     >
//       {icons[String(props.icon)]}
//     </div>
//   );
// }

// ColorlibStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    */
//   active: PropTypes.bool,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    */
//   completed: PropTypes.bool,
//   /**
//    * The label displayed in the step icon.
//    */
//   icon: PropTypes.node,
// };

const useStyles = makeStyles((theme) => ({
  root: {
    width: '1000px',
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
    <>
      <div className="container page-container" style={{backgroundImage: `url(${ball_in_glove})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="middle-container">
          {/* <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<QontoConnector />}
            > */}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            >

            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps ={};
              // if (isStepOptional(index)) {
              //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
              // }
              // if (isStepSkipped(index)) {
              //   stepProps.completed = false;
              // }

              return (
          
                  // <Step key={label} {...stepProps}>
                  <Step key={label}>
                    <StepLabel {...labelProps} StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                
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