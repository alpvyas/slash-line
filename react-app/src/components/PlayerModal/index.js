import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import slashline_logo from "../../images/logo.png";
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from "../Table";

const columnsA = ["Team", "Position", "Bats",
                   "Throws", "Height", "Weight", "DOB"];
  const columnsB = ["G", "AB", "R",
                   "H", "2B", "3B", "HR", "RBI", "BB", "SO", "SB", "CS", "AVG", "OBP", "SLG", "OPS"];

  const row_keys_A = ["mlb_team_name", "primary_position_txt", "bats", "throws", "height", "weight", "birth_date"];

  const row_keys_B = ["g", "ab", "r", "h", "d", "t", "hr", "rbi", "bb", "so", "sb", "cs", "avg", "obp", "slg", "ops"];


const PlayerModal = ({ open, setOpen, playerID, player }) => {
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
        <DialogTitle id="form-dialog-title">
          <Typography variant="h4" align="center">Welcome!</Typography>
        </DialogTitle>
          <DialogContent>
          <DialogContentText>
            <Typography variant="h6" align="center">Let's get you started here at Slash Line. When you're ready to start, click below.</Typography>
          </DialogContentText>
          <div className="player-image-container">
                <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${playerID}/headshot/67/current`} alt="player-img" className="player-image" />
              </div>
            <div className="player-stats-container">
            <Table columns={columnsB} rows={[player.player]} row_keys={row_keys_B}/>
          </div>
          </DialogContent>
          <DialogActions style={{justifyContent: 'center'}}>
          </DialogActions>

      </Dialog>
    </>
  );
};

export default PlayerModal;