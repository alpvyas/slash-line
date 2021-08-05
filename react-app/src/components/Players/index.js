import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import Carousel from "../Carousel";
import Scorecard from "../Containers/Scorecard";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
import "./Players.css";
import houser_bunt from "../../images/houser-bunt.png";
import { add_player } from "../../store/userTeams";
import PlayerDetail from "../PlayerDetails";
import mookie_betts from "../../images/mookie_betts.png";
import { get_single_player_stats } from "../../store/stats";
import { game_details } from "../../mock_game_data";
import Button from '@material-ui/core/Button';


const Players = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const league = useSelector(state => state.leagues.current)
  const players = useSelector(state => state.players.players);

  const [spotlightPlayer, setSpotlightPlayer] = useState({});
  const [spotlightName, setSpotlightName] = useState("");
  const [playerID, setPlayerID] =useState("");


  const getStats = async (player) => {
    const response = await dispatch(get_single_player_stats(player))

    setSpotlightPlayer(response);
    setSpotlightName(player.full_name);
    setPlayerID(player.mlb_player_id);
  
  }

 const addPlayer = (player) => {
    const response = dispatch(add_player(player, user.id, league.id))
    console.log("RESPONSE ", response)
  }

  const columns = useMemo((height, date, bday, day, month, year) => [
    {
      Header: "Player",
      accessor: "full_name",
      Cell: props => (
        <button className="player-name-button" onClick={() => getStats(props.row.original)}>
          {props.row.original.full_name}
        </button>
      ),
    },
    {
      Header: "Team",
      accessor: "mlb_team_name",
    },
    {
      Header: "Position",
      accessor: "primary_position_txt",
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
      Header: "Nickname",
      accessor: "nick_name",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "",
      accessor: "mlb_player_id",
      Cell: props => (
        <button className="add-player-button" onClick={() => addPlayer(props.row.original)}>
          Add Player
        </button>
      ),
    },

  ], [addPlayer]);


  // const game_details = useSelector(state => state.gameDetails.gameDetails);
  const gameDetails = game_details;

  const games = gameDetails&&gameDetails.map((game_detail) => (
    <Scorecard game={game_detail}/>
  ));

  return (
    
      <div className="page-container" style={{backgroundImage: `url(${houser_bunt})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="score-carousel-container-players">
          {games && <Carousel children={games} show={4} infiniteLoop={true}/>}
        </div>
        <div className="middle-container">
          <div className="table-container">
            <div className="header">
              <h3>Players</h3>
            </div>
            <ReactTable columns={columns} data={players} allPlayers={true}/>
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
           {/* <div className="misc-container"></div> */}
         </div>
        <div className="footer-container">
          <Footer />
         </div>
      </div>
  )
}

export default Players;