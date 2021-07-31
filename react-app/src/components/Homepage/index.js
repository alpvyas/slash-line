import React, { useState, useEffect, useMemo, memo }from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserLeagues, setCurrentLeague } from "../../store/leagues";
import Button from '@material-ui/core/Button';
import Carousel from "../Carousel";
import Scorecard from "../Containers/Scorecard";
import LeagueFormModal from "../LeagueFormModal";
import NavBar from "../NavBar/index";
import Table from "../Table";
import ReactTable from "../ReactTable";
import sunset_field from "../../images/sunset-field.png";
import "./Homepage.css";
import Standings from "../Containers/Standings";
import Footer from "../Footer";
import { getUserTeams } from "../../store/userTeams";
import { game_details } from "../../mock_game_data";
import CreateLeagueModal from "../CreateLeagueModal";

const Homepage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const leagues = useSelector(state => state.leagues.leagues);
  const userTeams = useSelector(state => state.userTeams.teams);
  const selectedTeam = useSelector(state => state.leagues.selectedTeam);
  const currentLeague = useSelector(state => state.leagues.current);
  const [currentTeam, setCurrentTeam] = useState(undefined);
  const [createLeague, setCreateLeague] = useState(false);

  // const gameDetails = useSelector(state => state.gameDetails.gameDetails);
  const gameDetails = game_details;
  const games = gameDetails&&gameDetails.map((gameDetail) => (
    <Scorecard game={gameDetail}/>
  ));

  //gets the leagues that the current user belongs to
  useEffect(() => {
    if (user) {
      dispatch(getUserLeagues(user.id))
      .then(leagues => {
        setCurrentLeague(leagues[Object.keys(leagues)[0]])
      })
      }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserTeams(user.id))
    }
  }, []);

  useEffect(() => {
      if (currentLeague !== undefined) {
        const leagueID = currentLeague.info["id"]
        setCurrentTeam(userTeams[leagueID])
      }
    }, [currentLeague, userTeams]);

  //formatting date and time
  for (const league in leagues){
    let draftDateTime = leagues[league].info["draft_date"];
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

    leagues[league].info.date = `${month} / ${day} / ${year}`
    leagues[league].info.time = `${hour}:${formatted_minutes} ${AMPM}`
  };

  const leaguesArray = []
  for (const league in leagues){
    leaguesArray.push(leagues[league].info)
  }

  const columns = ["League Name", "League Type", "Permissions",
                   "Draft", "Draft Date", "Draft Time", ""];

  const row_keys = ["name", "league_type", "permissions", "draft_type", "date", "time"];

  const userTeamColumns = useMemo((date, bday, day, month, year) => [
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
      <div className="container page-container" style={{backgroundImage: `url(${sunset_field})`}}>

          <NavBar />
    
        <div className="score-carousel-container">
          {games && <Carousel items={games} show={5} infiniteLoop={true}/>}
        </div>
        <div className="middle-container" style={{marginBottom: '150px'}}>

          <div className="standings-list-container">
              <h3>Standings</h3>
              {leagues && <Standings user={user}/>}
          </div>

          <div className="create-league-container">
              <h3>Leagues</h3>
              <Table columns={columns} rows={leaguesArray} row_keys={row_keys} leagues={true} button={true}/>
              <Button className="submit-button" style={{backgroundColor: "whitesmoke", marginTop: "20px"}} onClick={() => setCreateLeague(true)}>Create New League</Button>
              {createLeague && <CreateLeagueModal open={createLeague} setCreateLeague={setCreateLeague}/>}
          </div>
        </div>

         <div className="bottom-container" style={{marginBottom: '150px'}}>
           
          <div className="selected-team-container">
               <h3>Selected Team</h3>
              {
                currentLeague &&
                selectedTeam && 
                <ReactTable 
                  columns={userTeamColumns}
                  data={[...selectedTeam.players.active, ...selectedTeam.players.injured]}
                  allPlayers={false}/>
              }
          </div>

           <div className="user-players-container">
               <h3>My Team</h3>
              {
                currentLeague &&
                currentTeam &&
                <ReactTable
                  columns={userTeamColumns}
                  data={currentTeam.players.active}
                  allPlayers={false}/>
              }
           </div>
         </div>
        <Footer />
 
      </div>
    </>
  )
}

export default memo(Homepage);