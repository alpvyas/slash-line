import React, { useState, useEffect, useMemo, memo }from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserLeagues } from "../../store/leagues";
import Button from '@material-ui/core/Button';
import Carousel from "../Carousel";
import Scorecard from "../Containers/Scorecard";
import Standings from "../Containers/Standings";
import CreateLeagueModal from "../CreateLeagueModal";
import Table from "../Table";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
import Loading from "../Loading";
import SidebarModal from "../Sidebar/SidebarModal";
import StandardModal from "../StandardModal";
import JoinLeague from "../StartWizard/JoinLeague";
import { getUserTeams } from "../../store/userTeams";
import { game_details } from "../../mock_game_data";
import ballInGlove from '../../images/baseball-glove-dirt.png';
import "./Homepage.css";
import SplashNav from "../SplashNav";

const Homepage = ({ loaded }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const leagues = useSelector(state => state.leagues.leagues);
  const userTeams = useSelector(state => state.userTeams.teams);
  const currentLeague = useSelector(state => state.leagues.current.league);
  const [currentTeam, setCurrentTeam] = useState(undefined);
  const [createLeague, setCreateLeague] = useState(false);
  const [joinLeague, setJoinLeague] = useState(false);

  const authenticated = useSelector(state => state.session.authenticated);
  const leaguesLoaded = useSelector(state => state.leagues.loaded);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState("");

  /*the line below pulls live game data for the score carousel
  currently using mock game data */
  // const gameDetails = useSelector(state => state.gameDetails.gameDetails);
  const gameDetails = game_details;
  const games = gameDetails&&gameDetails.map((gameDetail) => (
    <Scorecard game={gameDetail}/>
  ));

  const handleSidebarModal = () => {
    setSidebarOpen(true);
  };

  //gets the leagues that the current user belongs to
  useEffect(() => {
    if (user) {
      dispatch(getUserLeagues(user.id))
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(getUserTeams(user.id))
    }
  }, [dispatch, user]);

  useEffect(() => {
      if (currentLeague !== undefined && userTeams !== undefined) {
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

    const hour = hour_24_clock > 12 ? hour_24_clock - 12 : hour_24_clock;
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
        {!leaguesLoaded && <Loading />}
        {leaguesLoaded && authenticated &&
        
        <div className="container page-container" style={{
            background: `url(${ballInGlove}) no-repeat center center fixed`,
            backgroundSize: "cover"}}>
        <SplashNav setModal={setModal} handleSidebarModal={handleSidebarModal} landing={true}/>
        <SidebarModal 
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          modal={modal}
        />

        <div className="score-carousel-container-home">
          {games && <Carousel children={games} show={4} infiniteLoop={true}/>}
        </div>

        <div className="home-middle-container">
          <div className="standings-list-container">
            <div className="header-description">
              <h3>Standings</h3>
              <h5>
                Stay up to date with league standings. 
                Click on a team to view more details.
              </h5>
            </div>
              {leagues && <Standings user={user}/>}
          </div>

          <div className="create-league-container">
            <div className="header-description">
              <h3>Leagues</h3>
              <h5>
                Below you can get details about the leagues you've joined.
                You can also start a new league or join an existing one.
              </h5>
              </div>
              <Table columns={columns} rows={leaguesArray} row_keys={row_keys} leagues={true} button={true}/>
              <Button className="submit-button" style={{backgroundColor: "whitesmoke", marginTop: "20px"}} onClick={() => setCreateLeague(true)}>Create New League</Button>
              <Button className="submit-button" style={{backgroundColor: "whitesmoke", marginTop: "20px"}} onClick={() => setJoinLeague(true)}>Join New League</Button>
              {createLeague && <CreateLeagueModal open={createLeague} setCreateLeague={setCreateLeague}/>}
              {joinLeague && <StandardModal open={joinLeague} setOpen={setJoinLeague} initialStep={'joinLeague'}joinLeagueComponent={<JoinLeague />}/>}
          </div>
        </div>

         <div className="home-bottom-container">
           <div className="user-players-container">
             <div className="header-description">
               <h3>Your Teams</h3>
              <h5>
                These are the past and current rosters for each of your teams.
                Click on a player's name to get more information about that player.
              </h5>
              </div>
              {
                currentLeague &&
                currentTeam &&
                <ReactTable
                columns={userTeamColumns}
                data={userTeams[currentLeague.info.id].players.active}
                allPlayers={false}/>
              }
           </div>
           <div className="user-players-container">
             <div className="header-description">
               <h3>From Around the Diamond</h3>
              <h5>
                The latest news to keep you up to date with
                 what's happening around the league.
              </h5>
              </div>
              {
                currentLeague &&
                currentTeam &&
                <ReactTable
                columns={userTeamColumns}
                data={userTeams[currentLeague.info.id].players.active}
                allPlayers={false}/>
              }
           </div>
         </div>

        <Footer />
      </div>
        }
    </>
  )
}

export default memo(Homepage);