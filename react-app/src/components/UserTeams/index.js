import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
import dodgers_cap from "../../images/dodgers-cap-glove.png";
import sunset_field from "../../images/sunset-field.png";
import holding_balls from "../../images/player-holding-balls.png";
import glove_ball from "../../images/close-up-baseball-held-glove.png";
import "./UserTeams.css";
import InjuredList from "../Containers/InjuredList";
import { add_to_IL } from "../../store/userTeams";
import { Table } from "@material-ui/core";
import PlayerDetail from "../PlayerDetails";
import { get_single_player_stats } from "../../store/stats";
import Scorecard from "../Containers/Scorecard";
import Carousel from "../Carousel";
import mookie_betts from "../../images/mookie_betts.png";
import { game_details } from "../../mock_game_data";


const MyTeam = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const currentLeague = useSelector(state => state.leagues.current);
  const injuredList = useSelector(state => state.userTeam.injuredList);
  const players = useSelector(state => state.userTeam.allPlayers[0]);
  const [spotlightPlayer, setSpotlightPlayer] = useState({});
  const [spotlightName, setSpotlightName] = useState("");
  const [playerID, setPlayerID] = useState("");

  const activePlayers = players

  const addToIL = (player) => {
    const response = dispatch(add_to_IL(player))
    console.log("RESPONSE ", response)
  }

  const getStats = async (player) => {
    const response = await dispatch(get_single_player_stats(player))
    setSpotlightPlayer(response);
    setSpotlightName(player.full_name);
    setPlayerID(player.mlb_player_id);
    
  }

 const columns = useMemo((height, date, bday, day, month, year) => [
    {
      Header: "Player",
      accessor: "full_name",
      Cell: props => (
        <button onClick={() => getStats(props.row.original)}>
          {props.row.original.full_name}
        </button>
      ),
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
      Header: "",
      accessor: "player_id",
      Cell: props => (
        <button onClick={() => addToIL(props.row.original)}>
          Place on IL
        </button>
      ),
    },
  ], []);

  // const game_details = useSelector(state => state.gameDetails.gameDetails);
  const gameDetails = game_details;

  const games = gameDetails&&gameDetails.map((game_detail) => (
    <Scorecard game={game_detail}/>
  ));

  return (
    <>
      <div className="page-container" style={{backgroundImage: `url(${glove_ball})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="score-carousel-container-players">
          {games && <Carousel items={games} show={5} infiniteLoop={true}/>}
        </div>
        <div className="middle-container">
          <div className="table-container">
            <div className="header">
              <h3>Players</h3>
            </div>
            <ReactTable columns={columns} data={players}/>
          </div>
          <div className="table-container">
             <div className="section-header">
               <h3>Injured List</h3>
             </div>
             {injuredList && <InjuredList />}
           </div>
         </div>
        <div className="bottom-container">
            <div className="spotlight-container">
             <div className="header">
               <h3>Player Spotlight</h3>
             </div>
             <div className="image-details-container">
              <div className="player-image-container">
                <img src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${playerID}/headshot/67/current`} alt="player-img" className="player-image" />
              </div>
              <div className="player-details-container">
                <PlayerDetail player={spotlightPlayer} name={spotlightName}/>
              </div>
             </div>
           </div>
           {/* <div className="misc-container">
             <div className="section-header">
               <h3>Injured List</h3>
             </div>
             {injuredList && <InjuredList />}
           </div>
         </div> */}
         </div>
         <div className="footer-container">
          <Footer />
         </div>
         </div>
    </>
  )

};

export default MyTeam;