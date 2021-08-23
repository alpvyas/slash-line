import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import slashline_logo from "../../images/logo.png";
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Table from "../Table";

const useStyles = makeStyles({
  image: {
    height: '50px',
    width: '50px',
  },
  
});

const columnsA = [
  "Team", "Position", "Bats", "Throws", "Height", "Weight", "DOB"
];
  const columnsB = [
    "G", "AB", "R", "H", "2B", "3B", "HR", "RBI",
    "BB", "SO", "SB", "CS", "AVG", "OBP", "SLG", "OPS"
  ];

  const row_keys_A = [
    "mlb_team_name", "primary_position_txt", "bats",
    "throws", "height", "weight", "birth_date",
  ];

  const row_keys_B = [
    "g", "ab", "r", "h", "d", "t", "hr", "rbi",
    "bb", "so", "sb", "cs", "avg", "obp", "slg", "ops",
  ];


const PlayerModal = ({ open, setOpen, playerID, player }) => {
    const handleClose = () => {
      setOpen(false);
    };

    const playerPosition = (position) => {
      switch (Number(position)) {
        case 1:
          return "a Pitcher";
        case 2:
          return "a Catcher";
        case 3:
          return "a First Baseman";
        case 4:
          return "a Second Baseman";
        case 5:
          return "a Third Baseman";
        case 6:
          return "a Shortstop";
        case 7:
          return "an Outfielder";
        case 8:
          return "an Outfielder";
        case 9:
          return "an Outfielder";
        default:
          return "a Player";
      }
    };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ overflow: "hidden" }}
        fullWidth
        maxWidth={'lg'}
      >
        <div style={{ padding: 20 }}>
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          style={{margin: '15px 15px -15px 15px'}}
        >
          <img
            alt="logo"
            src={slashline_logo}
            style={{height: '50px', width: '50px'}}
          />
          <Typography
            variant="h3"
            align="center"
            style={{color: '#ef3e42', textShadow: '-1px -1px 0 #ef3e42, 1px -1px 0 #ef3e42, -1px 1px 0 #ef3e42, 1px 1px 0 #ef3e42'}}
          >
            Slash Line Baseball
          </Typography>
        </Grid>
        </div>
        <DialogTitle id="form-dialog-title">
          <Typography
            variant="h4"
            align="center"
          >
            {player.full_name}
          </Typography>
        </DialogTitle>
          <DialogContent>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center'}}>

              <img
                src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${playerID}/headshot/67/current`}
                alt="player-img"
                className="player-image"
                style={{marginRight: '5vh'}}
              />

              <div
                className="player-stats-container"
                style={{display: 'flex', flexDirection: 'column', width: '90vh'}}
              >
                <DialogContentText>
                  <Typography
                    variant="h6"
                    align="center"
                  >
                    {`${player.info.full_name} is
                    ${playerPosition(player.info.primary_position)} for the 
                    ${player.info.mlb_team_name}`}
                  </Typography>
                </DialogContentText>
                {/* <Table
                  columns={columnsA}
                  rows={[player.info]}
                  row_keys={row_keys_A}
                /> */}
                <Table
                  columns={columnsB}
                  rows={[player.stats]}
                  row_keys={row_keys_B}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions style={{justifyContent: 'center'}}>
          </DialogActions>

      </Dialog>
    </>
  );
};

export default PlayerModal;