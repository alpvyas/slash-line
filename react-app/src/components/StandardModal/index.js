import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import slashline_logo from "../../images/logo.png";
import Typography from '@material-ui/core/Typography';
import JoinLeague from '../StartWizard/JoinLeague';
import CreateTeam from "../StartWizard/CreateTeam";
import Confirm from "../StartWizard/Confirm";


const StandardModal = ({ open, setOpen, initialStep }) => {
    const [step, setStep] = useState(initialStep);
    const [buildStep, setBuildStep] = useState('name');
    const [teamName, setTeamName] = useState('');
    const [colors, setColors] = useState({});
    const [teamLogo, setTeamLogo] = useState('');
    const [leagueID, setLeagueID] = useState('');
    const [modalWidth, setModalWidth] = useState('sm');

    const handleClose = () => {
      setOpen(false);
    };


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ overflow: "hidden" }}
        maxWidth={modalWidth}
        fullScreen={buildStep === 'color'}
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
        {step === 'joinLeague' && <JoinLeague setStep={setStep} leagueID={leagueID} setLeagueID={setLeagueID}/>}
        {step === 'createTeam' && <CreateTeam setStep={setStep} buildStep={buildStep} setBuildStep={setBuildStep} leagueID={leagueID} setTeamName={setTeamName} teamName={teamName} setColors={setColors} colors={colors} setTeamLogo={setTeamLogo} />}
      </Dialog>
    </>
  );
};

export default StandardModal;