import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import Divider from '@material-ui/core/Divider';
import CreateTeam from '../CreateTeam';
import { useDispatch } from 'react-redux';
import Table from "../../Table";
import { getLeagueInfo } from '../../../store/leagues';



const Confirmation = ({ teams, leagueId }) => {
  const dispatch = useDispatch();

  const [confirmed, setConfirmed] = useState(false)
  const [leagueInfo, setLeagueInfo] = useState("")

  const headers = ["Teams"];
  const row_keys = ["name"];

  useEffect(() => {
    dispatch(getLeagueInfo(leagueId))
    .then( (league) => setLeagueInfo(league))
  }, [leagueId]);

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
                  <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                        <SportsBaseballIcon />
                      </ListItemAvatar>
                      <ListItemText primary="League" secondary={leagueInfo["name"]} />
                    </ListItem>
                    <Divider component="li" />
                   
                    <ListItem>
                      <ListItemAvatar>
                        <EmojiPeopleIcon />
                      </ListItemAvatar>
                      <ListItemText primary="Permisions" secondary={leagueInfo["permissions"]} />
                    </ListItem>
                    <Divider component="li" variant="inset" />
                    
                    <ListItem>
                      <ListItemAvatar>
                        <AssignmentIcon />
                      </ListItemAvatar>
                      <ListItemText primary="Draft" secondary={leagueInfo["draft_type"]} />
                    </ListItem>

                    <Divider component="li" variant="inset" />

                    <ListItem>
                      <ListItemAvatar>
                        <EventAvailableIcon />
                      </ListItemAvatar>
                      <ListItemText primary="Draft Date" secondary={leagueInfo["draft_date"]} />
                    </ListItem>

                    <Divider component="li" variant="inset" />

                    <ListItem>
                      <ListItemAvatar>
                        <QueryBuilderIcon />
                      </ListItemAvatar>
                      <ListItemText primary="Draft Time" secondary={leagueInfo["draft_time"]} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                        <SportsBaseballIcon />
                      </ListItemAvatar>
                      <ListItemText primary="League" secondary={leagueInfo["name"]} />
                    </ListItem>
                    <Divider component="li" />
                   
                    <ListItem>
                      <ListItemAvatar>
                        <EmojiPeopleIcon />
                      </ListItemAvatar>
                      <ListItemText primary="Permisions" secondary={leagueInfo["permissions"]} />
                    </ListItem>
                  </List>
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