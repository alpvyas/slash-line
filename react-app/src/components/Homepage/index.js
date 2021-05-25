import React, { useState, useEffect, useMemo, memo }from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_leagues } from "../../store/createLeague";
import { get_game_details, get_game_details_backend } from "../../store/gameDetails";
// import { game_details } from "../../mock_game_data";
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
import { get_roster_40 } from "../../store/players";
import { get_stats_from_backend } from "../../store/stats";
import LogoutButton from "../auth/LogoutButton";
import { Redirect, useHistory } from "react-router";

const Homepage = () => {
  const dispatch = useDispatch();
  const [leagues, setLeagues] = useState([]);
  const [count, setCount] = useState(0);
  const user = useSelector(state => state.session.user);
  const userPlayers = useSelector(state => state.userTeam.userTeam);



  // useEffect(() => {
  //   dispatch(get_roster_40())
  //   }, [dispatch])

    
  //   useEffect(() => {
  //     dispatch(get_stats_from_backend())
  //   }, [dispatch]);

  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  for (let index = 0; index < months.length; index++) {
    if (month === index) month = months[index]
  };

  if (day < 10) day = `0${day}`;

  const today = year + '-' + month + '-' + day;
  
  setInterval(() => setCount(count + 1), 5000);

  useEffect(() => {
      const response = dispatch(get_game_details_backend(today));
      console.log("RESPONSE GAME DETAILS: ", response)

    }, [dispatch, today])


  // useEffect(() => {

  //   const interval = setInterval(() => {
  //     const response = dispatch(get_game_details(today));
  //     console.log("RESPONSE GAME DETAILS: ", response)

  //   }, 5000)
    
  //   return () => clearInterval(interval)

  //   }, [dispatch, today])

  const game_details = useSelector(state => state.gameDetails);

  const games = game_details&&game_details.map((game_detail) => (
    <Scorecard game={game_detail}/>
  ));

  useEffect(() => {
    if (user){
      dispatch(get_leagues(user.id))
    .then(data => setLeagues(data["leagues"]));
    }
    }, [dispatch, user])

    // console.log("LEAGUES: ", leagues)

    leagues.forEach(league => {
      let draftDateTime = league["draft_date"];
      let dateTimeArray = draftDateTime.split(" ");
      let date = dateTimeArray[0];
      let time = dateTimeArray[1];

      let dateArray = date.split("-");
      // console.log("DATE: ", dateArray)
      let timeArray = time.split(":");
      // console.log("TIME: ", timeArray)

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
    });

  const columns = ["League Name", "League Type", "Permissions",
                   "Draft", "Draft Date", "Draft Time"];

  const row_keys = ["name", "league_type", "permissions", "draft",
                    "date", "time"];

  const myPlayerColumns = useMemo((height, date, bday, day, month, year) => [
    {
      Header: "Player",
      accessor: "name_display_first_last",
    },
    {
      Header: "Position",
      accessor: "position_txt",
    },
    {
      Header: "Team",
      accessor: "team_name",
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
      accessor: "height_feet",
      Cell: props => (
        height = `${props.row.original.height_feet}${"'"}${props.row.original.height_inches}`
      ),
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
      Header: "",
      accessor: "player_id",
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
          {/* {games && <Carousel items={games} show={5} infiniteLoop={true}/>} */}
        </div>
        <div className="middle-container">
          <div className="standings-list-container">
            <div className="header">
              <h3>Standings</h3>
          </div>
            <Standings />
          </div>
          <div className="create-league-container">
            <div className="header">
              <h3>Leagues</h3>
            </div>
           <Table columns={columns} rows={leagues} row_keys={row_keys}/>
           <LeagueFormModal />
          </div>
         </div>
         <div className="bottom-container">
           <div className="user-players-container">
             <div className="header">
               <h3>My Players</h3>
             </div>
             <div className="table-container">
              <ReactTable columns={myPlayerColumns} data={userPlayers}/>
             </div>
           </div>

           {/* <div className="misc-container"><LogoutButton/></div> */}
         </div>
         <div className="footer-container">
          <Footer />
         </div>
      </div>
    </>
  )
}

export default memo(Homepage);