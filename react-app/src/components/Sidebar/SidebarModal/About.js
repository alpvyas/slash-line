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


const About = ({ open, setOpen }) => {

  return (
    <>
        <DialogContent>
          <DialogContentText>
              <Typography variant="h6" align="center">Slash Line Baseball is a data heavy fantasy baseball application where fans can create their own leagues and teams, drafting their favorite players to compete against friends. Follow the season and see if your team comes out on top. With real-time player data and player performance stats, users can build their best fantasy team to win it all. </Typography>
          </DialogContentText>
        </DialogContent>
    </>
  );
};

export default About;