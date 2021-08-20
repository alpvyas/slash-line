import React from 'react';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import SettingsApplicationsTwoToneIcon from '@material-ui/icons/SettingsApplicationsTwoTone';
import DevicesTwoToneIcon from '@material-ui/icons/DevicesTwoTone';
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone';


const ComingSoon = ({ open, setOpen }) => {

  return (
    <>
        <DialogContent style={{overflow: 'hidden'}}>
          <DialogContentText style={{height: 'fit-content', blockSize: 'fit-content'}}>
              <Typography variant="h6" align="center">We've got a lot planned!. Here's a preview</Typography>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogContent>
          <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <ChatTwoToneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Forums and Chat"
            secondary="Interact with other users in topic specific forums, direct messaging and chat"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountCircleTwoToneIcon />
          </ListItemIcon>
          <ListItemText
            primary="User Profiles"
            secondary="Set up a user profile and tell others about yourself. You'll also be able to upload an avatar."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SettingsApplicationsTwoToneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Customization"
            secondary="We're working on bringing you customization features so you can toggle to dark mode, choose your favorite team's colors to be used across the site and to set notification settings. We're also adding new features and settings for your teams and leagues."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DevicesTwoToneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Mobile App"
            secondary="You'll soon be able to manage your team, check scores and stats using the Slash Line Baseball mobile app. Keep track of everything on your computer or your phone."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountBalanceTwoToneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Secure Payments"
            secondary="Want to make your leagues a little more interesting? we're working on secure payment systems so that you can apply league membership fees and create a collective pot that'll be awarded according to your league settings."
          />
        </ListItem>
        </List>
        </DialogContent>
    </>
  );
};

export default ComingSoon;