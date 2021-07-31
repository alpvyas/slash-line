import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import slashline_logo from "../../images/logo.png";
import LoginForm from '../authorization/LoginForm';
import SignupForm from '../authorization/SignupForm';
import Typography from '@material-ui/core/Typography';
import CreateLeagueForm from '../CreateLeagueForm';
import './CreateLeagueModal.css';

const CreateLeagueModal = ({ open, setOpen, setCreateLeague }) => {

    // const handleOpen = () => {
    //   setOpen(true);
    // };

    const handleClose = () => {
      setCreateLeague(false);
    };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ overflow: "hidden" }}
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
      <CreateLeagueForm />

      </Dialog>
    </>
  );
};

export default CreateLeagueModal;