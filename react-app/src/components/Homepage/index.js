import React, { useState, useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_leagues } from "../../store/createLeague";
// import { get_game_details } from "../../store/gameDetails";
import { games } from "../../mock_game_data";
import Carousel from "../Carousel";
// import Scorecard from "../Containers/Scorecard";
import LeagueFormModal from "../LeagueFormModal";
import NavBar from "../NavBar/index";
import Table from "../Table";
import bauer_practice from "../../images/bauer-practice.png";
import "./Homepage.css";
import Standings from "../Container/Standings";
import Footer from "../Footer";

const Homepage = () => {
  const dispatch = useDispatch();
  const [leagues, setLeagues] = useState([])
  const user = useSelector((state) => state.session.user);

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
  
  // useEffect(() => {
  //   const game_data_interval = setInterval(() => {
  //     dispatch(get_game_details(today))
  //   }, 60000);

  //   return () => clearInterval(game_data_interval)
  //   }, [dispatch])

  // const game_details = useSelector((state) => state.gameDetails);

  // const games = game_details.map((game_detail) => (
  //   <Scorecard game={game_detail}/>
  // ));

  useEffect(() => {
    
    dispatch(get_leagues(user.id))
    .then(data => setLeagues(data["leagues"]));

    }, [dispatch, user])

  const columns = ["League Name", "League Type", "Permissions",
                   "Draft", "Draft Date", "Draft Time"];

  const row_keys = ["name", "league_type", "permissions", "draft",
                    "draft_date", "draft_time"];

  return (
    <>
      <div className="container page-container" style={{backgroundImage: `url(${bauer_practice})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="score-carousel-container">
          <Carousel items={games} show={5} infiniteLoop={true}/>
        </div>
        <div className="middle-container">
          <div className="standings-list-container">
            <Standings />
          </div>
          <div className="create-league-container">
           <LeagueFormModal />
           <Table columns={columns} rows={leagues} row_keys={row_keys}/>
          </div>
         </div>
         <div className="bottom-container">
           <div className="misc-container"></div>
           <div className="misc-container"></div>
         </div>
         <div className="footer-container">
          <Footer />
         </div>
      </div>
    </>
  )
}

export default Homepage;