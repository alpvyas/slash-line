import React, { useState } from 'react';
// import { NavLink, Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import slashline_logo from "../../images/logo.png";
import Typography from '@material-ui/core/Typography';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ComingSoon from '../ComingSoon';

const SidebarModal = ({ modal, open, setOpen }) => {

    // const handleOpen = () => {
    //   setOpen(true);
    // };

    const handleClose = () => {
      setOpen(false);
    };

    let title;

   if (modal === "coming-soon"){
     title = "Coming Soon"
   } else if (modal === 'about'){
     title = "About"
   }


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
          <DialogTitle id="form-dialog-title">
            <Typography variant="h4" align="center">{title}</Typography>
          </DialogTitle>
        </Grid>
        </div>
       
        {modal === 'coming-soon' && <ComingSoon />}
      </Dialog>
    </>
  );
};

export default SidebarModal;