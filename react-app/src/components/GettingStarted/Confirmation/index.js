import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateTeam from '../CreateTeam';
import { useDispatch } from 'react-redux';
import Table from "../../Table";



const Confirmation = ({ teams, leagueId }) => {
  const dispatch = useDispatch();

  const [confirmed, setConfirmed] = useState(false)

  const headers = ["Teams"];
  const row_keys = ["name"];

  const submit = () => {

  }

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  })

  const classes = useStyles();


  return (
   <>
          {(!confirmed) && (
            <>
            <h2>You're almost done! Take a look and make sure everything looks correct.</h2>

            <form className="input-container">
              {/* <Card>
                <Table columns={headers} rows={teams} row_keys={row_keys}/>
              </Card> */}
              <Card>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
                </CardContent>
              </Card>
            </form>

            <div className="buttons-container">

              {/* <Button className="new-league-button" variant="outlined" color="primary" onClick={() => submit()}>
                Join this league
              </Button> */}

            </div>
            </>
          )}
            
          {confirmed && <CreateTeam leagueId={leagueId}/>}
    </>
  )
};

export default Confirmation;