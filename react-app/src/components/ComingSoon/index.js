import React from 'react';
// import { NavLink, Redirect } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../store/session';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import slashline_logo from "../../images/logo.png";
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const ComingSoon = ({ open, setOpen }) => {

    // const handleOpen = () => {
    //   setOpen(true);
    // };

    const handleClose = () => {
      setOpen(false);
    };

  return (
    <>
        <DialogContent>
          <DialogContentText>
              <Typography variant="h6" align="center">We've got a lot planned at Slashline Baseball. Here's a preview of what's in the works.</Typography>
          </DialogContentText>
        </DialogContent>
    </>
  );
};

export default ComingSoon;