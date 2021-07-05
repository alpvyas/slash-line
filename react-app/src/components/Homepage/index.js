import React, { useState, useEffect, useMemo, memo }from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserLeagues } from "../../store/leagues";
import Carousel from "../Carousel";
import Scorecard from "../Containers/Scorecard";
import LeagueFormModal from "../LeagueFormModal";
import NavBar from "../NavBar/index";
import Table from "../Table";
import ReactTable from "../ReactTable";
import bauer_practice from "../../images/bauer-practice.png";
import "./Homepage.css";
import Standings from "../Containers/Standings";
import Footer from "../Footer";
import LogoutButton from "../auth/LogoutButton";
import { Redirect, useHistory } from "react-router";
import { getUserTeams } from "../../store/userTeams";
import { game_details } from "../../mock_game_data";

const Homepage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const leagues = useSelector(state => state.leagues.leagues);
  const userTeams = useSelector(state => state.userTeams.teams);
  const [currentTeam, setCurrentTeam] = useState(undefined);
  const [currentLeague, setCurrentLeague] = useState(undefined);

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
        setCurrentLeague(leagues[1])
      })
      }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(getUserTeams(user.id))
    }
  }, [dispatch, user]);

  useEffect(() => {
      if (currentLeague !== undefined) {
        console.log("CL: ", currentLeague)
        const leagueID = currentLeague.info["id"]
        console.log("LEAGUE ID ", leagueID)
        setCurrentTeam(userTeams[leagueID])
      }
    }, [dispatch, currentLeague]);
  
  console.log("CURRENT TEAM: ", currentTeam)

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

  const row_keys = ["name", "league_type", "permissions",     "draft_type", "date", "time"];

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
    {
      Header: "",
      accessor: "mlb_player_id",
      Cell: props => (
        <button>
          Place on IL
        </button>
      ),
    },
  ], []);

  return (
    <>
      <div className="container page-container" style={{backgroundImage: `url(${bauer_practice})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="score-carousel-container">
          {games && <Carousel items={games} show={5} infiniteLoop={true}/>}
        </div>
        <div className="middle-container">
          <div className="standings-list-container">
            <div className="header">
              <h3>Standings</h3>
          </div>
            {leagues && <Standings user={user}/>}
          </div>
          <div className="create-league-container">
            <div className="header">
              <h3>Leagues</h3>
            </div>
           <Table columns={columns} rows={leaguesArray} row_keys={row_keys} button={true}/>
           <LeagueFormModal />
          </div>
         </div>
         <div className="bottom-container">
           <div className="user-players-container">
             <div className="header">
               <h3>My Team</h3>
             </div>
             <div className="table-container">
              {currentLeague && currentTeam && <ReactTable columns={userTeamColumns} data={currentTeam.players.active}/>}
             </div>
           </div>
         </div>
         <div className="footer-container">
          <Footer />
         </div>
      </div>
    </>
  )
}

export default memo(Homepage);