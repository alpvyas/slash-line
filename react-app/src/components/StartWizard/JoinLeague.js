import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Table from "../Table";
import { getOpenLeagues, joinUserLeague } from '../../store/leagues';


const JoinLeague = ({ setStep, leagueID, setLeagueID }) => {

  const dispatch = useDispatch();
  const [openLeagues, setOpenLeagues] = useState([]);
  const [leagueType, setLeagueType] = useState('');
  // const [leagueID, setLeagueID] = useState('');
  const [passcode, setPasscode] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getOpenLeagues())
    .then(leagues => {
      setOpenLeagues(leagues);
    })

  }, []);

  const leagues = openLeagues.map(league => {
    let draftDateTime = league["draft_date"];
    let dateTimeArray = draftDateTime.split(" ");
    let date = dateTimeArray[0];
    let time = dateTimeArray[1];

    let dateArray = date.split("-");
  
    let timeArray = time.split(":");

    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];

    const hour_24_clock = parseInt(timeArray[0], 10);
    const hour = hour_24_clock - 15;
    const minutes = parseInt(timeArray[1], 10);
    const formatted_minutes = minutes < 10 ? `0${minutes}` : minutes;
    const AMPM = hour_24_clock < 12 ? "AM" : "PM"

    league.date = `${month} / ${day} / ${year}`
    league.time = `${hour}:${formatted_minutes} ${AMPM}`
    return league
  })

  const columns = ["League Name", "League Type", "Permissions",
                   "Draft", "Draft Date", "Draft Time", ""];

  const row_keys = ["name", "league_type", "permissions", "draft_type", "date", "time"];

  const validatePasscode = (code) => {
    const regex = /^[0-9]{4,4}$/;

    if (!(regex.test(String(code)))) {
      setErrors({
        ...errors,
        passcodeError: 'Passcode must be exactly four digits.',
        passcodeErrorStatus: true
      });
    } else {
      setErrors({...errors, passcodeError: '', passcodeErrorStatus: false});
    }
  };

  const validateLeagueID = (id) => {
    const regex = /^[0-9]*$/;

    if (!(regex.test(String(id)))) {
      setErrors({
        ...errors,
        leagueIDError: 'League ID must only contain digits.',
        leagueIDErrorStatus: true
      });
    } else {
      setErrors({...errors, leagueIDError: '', leagueIDErrorStatus: false});
    }

  };

  const updateLeagueID = (id) => {
    validateLeagueID(id);
    setLeagueID(id);
  };

  const updatePasscode = (code) => {
    validatePasscode(code);
    setPasscode(code);
  };

  const handleJoin = () => {
    dispatch(joinUserLeague(leagueID, passcode))
    .then(
      (check) => {
        if (check.ok) {
          setErrors({
            ...errors,
            joinLeagueError: '',
            joinLeagueErrorStatus: false
          })
          setStep('createTeam');
        }
        else {
          setErrors({
            ...errors,
            joinLeagueError: check.errors,
            joinLeagueErrorStatus: true
          })
        }
      }
    )
  };

  const handleBack = () => {
    setLeagueType('');
    setErrors({})
  };


  return (
    <>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" align="center">Join a League</Typography>
      </DialogTitle>
        <DialogContent>
        <DialogContentText>
          {leagueType === '' && 
            <Typography variant="h6" align="center">Time to join a league! To join a private league you'll need a league ID and a passcode. If you don't have that info you can join one of the many open leagues that are available. </Typography>}

          {leagueType === 'private' && <Typography variant="h6" align="center">Please enter the league ID and passcode of the league you'd like to join.</Typography>}
          {errors.joinLeagueErrorStatus && <Typography style={{color: 'red'}} variant="h6" align="center">Something went wrong. Please try entering the league ID and passcode again.</Typography>}

          {leagueType === 'open' && <Typography variant="h6" align="center">Please select an open league to join.</Typography>}
        </DialogContentText>
          {leagueType === 'private' &&
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="leagueID"
              label="League ID"
              type="text"
              style={{width: '25vh', align: 'center'}}
              error={errors.leagueIDErrorStatus}
              helperText={errors.leagueIDError}
              onChange={(e) => updateLeagueID(e.target.value)}
            />
            <TextField
              margin="dense"
              variant="outlined"
              id="passcode"
              label="Passcode"
              type="text"
              style={{width: '25vh', align: 'center'}}
              error={errors.passcodeErrorStatus}
              helperText={errors.passcodeError}
              onChange={(e) => updatePasscode(e.target.value)}
            />
          </div>
          }

          {leagueType === 'open' && 
            <>
              <div className="leagues-container">
                <div className="header">
                  <h3>Leagues</h3>
                </div>
                <Table columns={columns} rows={leagues} row_keys={row_keys} joinOpen={true}/>
              </div>
            </>
          }
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          {leagueType === '' && 
            <>
              <Button className="submit-button" onClick={() => setLeagueType("private")}>Join Private League</Button>
              <Button className="submit-button" onClick={() => setLeagueType("open")}>Join Open League</Button>
            </>
          }

          {leagueType !== '' && <Button className="submit-button" onClick={() => handleBack()}>Back</Button>}
          {leagueType !== '' && <Button className="submit-button" onClick={() => handleJoin()}>Join League</Button>}
        </DialogActions>
    </>
  )
};

export default JoinLeague;