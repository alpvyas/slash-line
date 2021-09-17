import React from 'react';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


const About = ({ open, setOpen }) => {

  return (
    <>
        <DialogContent>
          <DialogContentText>
              <Typography variant="h6" align="center">Slash Line Baseball is a data heavy fantasy baseball application where fans can create their own leagues and teams, drafting their favorite players to compete against friends. Follow the season and see if your team comes out on top. With real-time player data and player performance stats, users can build their best fantasy team to win it all.
              <br></br>
              <br></br>
              Slash Line is an educational and non-commercial project. I
              decided to create this app to fine tune and hone my development
              skills in software engineering. It combines two things that I
              love: coding and baseball.
              <br></br>
              <br></br>
              Player headshot images have been sourced from the&nbsp;
                <a
                  href="https://www.mlb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MLB website
                </a>.
              </Typography>
          </DialogContentText>
        </DialogContent>
    </>
  );
};

export default About;