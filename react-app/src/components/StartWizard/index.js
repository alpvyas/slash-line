import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Start from './Start';
import JoinLeague from './JoinLeague';
import CreateTeam from './CreateTeam';
import ProfileBasics from './ProfileBasics';
import slashline_logo from "../../images/logo.png";
import ballInGlove from '../../images/baseball-glove-dirt.png';
import './StartWizard.css';
import Confirm from './Confirm';

const StartWizard = () => {
  const user = useSelector(state => state.session.user);
  const [step, setStep] = useState("start");
  const [teamName, setTeamName] = useState('');
  const [colors, setColors] = useState({}); 
  const [leagueID, setLeagueID] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState(null);

  const userID = user["id"];

  const userSelections = {
    userID,
    teamName,
    colors,
    leagueID,
    aboutMe,
    location,
    avatar,
  };

  return (
<>
        <Dialog
            open={true}
            // onClose={handleClose}
            aria-labelledby="form-dialog-title"
            // style={{ overflow: "hidden", background: `url(${ballInGlove}) no-repeat center center fixed`, objectFit: 'fill'}}
            style={{ background: `url(${ballInGlove}) no-repeat center center fixed`, backgroundSize: "cover"}}
            className="page-container"
          >
            <div style={{ padding: 20 }}>
            <Grid
              container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              
              style={{margin: '15px 15px -15px 15px'}}
            >
              <img alt="logo" src={slashline_logo} style={{height: '50px', width: '50px'}} />
              <Typography variant="h3" align="center" style={{color: '#ef3e42', textShadow: '-1px -1px 0 #ef3e42, 1px -1px 0 #ef3e42, -1px 1px 0 #ef3e42, 1px 1px 0 #ef3e42'}}>Slash Line Baseball</Typography>
            </Grid>
            </div>
            {step === 'start' && <Start step={step} setStep={setStep} />}

            {step === 'joinLeague' && <JoinLeague setStep={setStep} leagueID={leagueID} setLeagueID={setLeagueID} />}

            {step === 'createTeam' && <CreateTeam setStep={setStep} leagueID={leagueID} setTeamName={setTeamName} teamName={teamName} setColors={setColors} colors={colors}/>}

            {step === 'profile' && <ProfileBasics setStep={setStep} setAboutMe={setAboutMe} setLocation={setLocation} setAvatar={setAvatar} user={user}/>}

            {step === 'confirm' && <Confirm userSelections={userSelections}/>}
          </Dialog>
      </>
  )
};

export default StartWizard;