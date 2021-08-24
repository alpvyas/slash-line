import React, { useMemo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import slashline_logo from "../../images/logo.png";
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ReactTable from '../ReactTable';

const useStyles = makeStyles({
  image: {
    height: '50px',
    width: '50px',
  },

});


const TeamModal = ({ open, setOpen, team }) => {
    const handleClose = () => {
      setOpen(false);
    };

  const row_keys = ["name", "league_type", "permissions", "draft_type", "date", "time"];

  const teamColumns = useMemo((date, bday, day, month, year) => [
    {
      Header: "Player",
      accessor: "full_name",
    },
    {
      Header: "Position",
      accessor: "primary_position_txt",
    },
    {
      Header: "Team",
      accessor: "team_abbrev",
    },
    {
      Header: "Bats",
      accessor: "bats",
    },
    {
      Header: "Throws",
      accessor: "throws",
    },
    {
      Header: "Height",
      accessor: "height",
    },
    {
      Header: "Weight",
      accessor: "weight",
    },
    {
      Header: "DOB",
      accessor: "birth_date",
      Cell: props => {
        date = props.row.original.birth_date.split("T")
        bday = date[0].split("-")
        // [year, month, day] = bday
        year = bday[0]
        month = bday[1]
        day = bday[2]

        return month + " / " + day + " / " + year
      },

    },
    {
      Header: "Status",
      accessor: "status",
    },
  ], []);

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
            {team.info.name}
          </Typography>
        </DialogTitle>
          <DialogContent>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <div
                className="player-stats-container"
                style={{display: 'flex', flexDirection: 'column', width: '90vh'}}
              >
                <DialogContentText>
                  <Typography
                    variant="h6"
                    align="center"
                  >
                    {`${team.info.name} is managed by
                    ${team.user.first_name} ${team.user.last_name}(${team.user.username})`}
                  </Typography>
                </DialogContentText>
                <ReactTable 
                  columns={teamColumns}
                  data={[...team.players.active, ...team.players.injured]}
                  allPlayers={false}/>
              </div>
            </div>
          </DialogContent>
          <DialogActions style={{justifyContent: 'center'}}>
          </DialogActions>

      </Dialog>
    </>
  );
};

export default TeamModal;