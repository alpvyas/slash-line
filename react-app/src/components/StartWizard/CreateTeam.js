import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TeamAvatar from "../TeamAvatar";
import { ARI, ATL, BAL, BOS, CHC, CIN, CLE, COL, CWS, DET, HOU, KC, LAA, LAD, MIA, MIL, MIN, NYM, NYY, OAK, PHI, PIT, SD, SEA, SF, STL, TB, TEX, TOR, WSH } from '../../images';
import Box from '@material-ui/core/Box';
import Table from "../Table";
import { makeStyles } from '@material-ui/core/styles';
import { get_league_teams } from '../../store/leagues';
import { teamColors } from '../../team_colors';




const CreateTeam = ({ setStep, leagueID, setTeamName, teamName, setColors, colors }) => {

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [teams, setTeams] = useState('');
  const [colorKeys, setColorKeys] = useState([]);
  const [buildStep, setBuildStep] = useState('name');

  useEffect(() => {
    dispatch(get_league_teams(leagueID))
    .then(teams => {
      const teamNames = [];
      for (const team of teams){
        teamNames.push(team.name)
      }
      setTeams(teamNames);
    })
  }, [dispatch, leagueID]);

  const updateTeamName = (name) => {
    setTeamName(name);
    checkTeamName(name);
  };

  const checkTeamName = (name) => {
    if (teams.includes(name)){
        setErrors({...errors, teamNameError: "That team name has already been taken. Please use another one.", teamNameErrorStatus: true});
    } else {
        setErrors({});
    }
  };

  const updateColors = (team) => {
    const colors = teamColors[team];
    setColors(colors);
    const colorKeys = Object.keys(colors);
    setColorKeys(colorKeys);
  };

  const handleBack = () => {
    if (buildStep === 'name') setStep('joinLeague');
    if (buildStep === 'color') setStep('name');
    if (buildStep === 'confirm') setStep('color');
  };

  const handleNext = () => {
    if (!errors.teamNameErrorStatus && buildStep === 'name') setBuildStep('color');
    if (!errors.teamNameErrorStatus && buildStep === 'color') setBuildStep('confirm');

    if (!errors.teamNameErrorStatus && buildStep === 'confirm') {
      setStep('profile');
    }
    
  };

  // const mlbTeams = [ARI, ATL, BAL, BOS, CHC, CIN, CLE, COL, CWS, DET, HOU, KC, LAA, LAD, MIA, MIL, MIN, NYM, NYY, OAK, PHI, PIT, SD, SEA, SF, STL, TB, TEX, TOR, WSH];
  const mlbTeams = {"ARI": ARI, "ATL": ATL, "BAL": BAL, "BOS": BOS, "CHC": CHC, "CIN": CIN, "CLE": CLE, "COL": COL, "CWS": CWS, "DET": DET, "HOU": HOU, "KC": KC, "LAA": LAA, "LAD": LAD, "MIA": MIA, "MIL": MIL, "MIN": MIN, "NYM": NYM, "NYY": NYY, "OAK": OAK, "PHI": PHI, "PIT": PIT, "SD": SD, "SEA": SEA, "SF": SF, "STL": STL, "TB": TB, "TEX": TEX, "TOR": TOR, "WSH": WSH};


  return (
    <>
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4" align="center">Create a Team</Typography>
      </DialogTitle>
        <DialogContent>
        <DialogContentText>
         {buildStep === 'name' && <Typography variant="h6" align="center">Let's build your team! First, choose a team name.</Typography>}

         {buildStep === 'color' && <Typography variant="h6" align="center">Now choose your team colors.</Typography>}

         {buildStep === 'confirm' && <Typography variant="h6" align="center">Please confirm your selections.</Typography>}
        </DialogContentText>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {buildStep === 'name' && <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="team-name"
              label="Team Name"
              type="text"
              style={{width: '25vh', align: 'center'}}
              error={errors.teamNameErrorStatus}
              helperText={errors.teamNameError}
              onChange={(e) => updateTeamName(e.target.value)}
            />}

            {buildStep === 'color' && 
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {Object.values(mlbTeams).map(team => {
                  return (
                    <Grid item xs={2}>
                      <TeamAvatar updateColors={updateColors} logo={team} mlbTeams={mlbTeams}/>
                    </Grid>
                  )
                })}
              </Grid>
              }

            {buildStep === 'confirm' &&
              <Box>
                {colorKeys.map(key => {
                  return (
                      <div className="color-container">
                        <Box style={{color: `${colors[key]}`}}>{key}</Box>
                      </div>
                  ) 
                })}
                <div className="team-name-container">
                        <Box>Team Name: {teamName}</Box>
                </div>
              </Box>
            }
          </div>
          
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <Button className="submit-button" onClick={() => handleBack()}>Back</Button>
          <Button disabled={errors.teamNameErrorStatus} className="submit-button" onClick={() => handleNext()}>Next</Button>
        </DialogActions>
    </>
  )
};

export default CreateTeam;