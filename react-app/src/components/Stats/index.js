import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import Carousel from "../Carousel";
import houser_bunt from "../../images/houser-bunt.png";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
import "./Stats.css";
import Scorecard from "../Containers/Scorecard";
import PlayerModal from "../PlayerModal";
import { game_details } from "../../mock_game_data";
import { get_single_player_stats } from "../../store/stats";


const Stats = () => {
  const dispatch = useDispatch();
  const stats = useSelector(state => state.stats.stats.stats);

  const [spotlightPlayer, setSpotlightPlayer] = useState({});
  const [playerID, setPlayerID] =useState("");

  const [modal, setModal] = useState(false);

  // const game_details = useSelector(state => state.gameDetails.gameDetails);
  const gameDetails = game_details;

  const games = gameDetails&&gameDetails.map((game_detail) => (
    <Scorecard game={game_detail}/>
  ));

  const getStats = async (player) => {
    const playerStats = await dispatch(get_single_player_stats(player))

    setSpotlightPlayer(playerStats);
    setPlayerID(player.mlb_player_id);
    setModal(true);
  }

  const columns = useMemo(() => [
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
      accessor: "team_abbrev",
    },
    {
      Header: "G",
      accessor: "g",
    },
    {
      Header: "AB",
      accessor: "ab",
    },
    {
      Header: "R",
      accessor: "r",
    },
    {
      Header: "H",
      accessor: "h",
    },
    {
      Header: "2B",
      accessor: "d",
    },
    {
      Header: "3B",
      accessor: "t",
    },
    {
      Header: "HR",
      accessor: "hr",
    },
    {
      Header: "RBI",
      accessor: "rbi",
    },
    {
      Header: "BB",
      accessor: "bb",
    },
    {
      Header: "SO",
      accessor: "so",
    },
    {
      Header: "SB",
      accessor: "sb",
    },
    {
      Header: "CS",
      accessor: "cs",
    },
    {
      Header: "AVG",
      accessor: "avg",
    },
    {
      Header: "OBP",
      accessor: "obp",
    },
    {
      Header: "SLG",
      accessor: "slg",
    },
    {
      Header: "OPS",
      accessor: "ops",
    },
  ], []);

  return (
    <>
      <div className="container page-container" style={{backgroundImage: `url(${houser_bunt})`}}>
          <div className="nav-bar-container">
            <NavBar />
          </div>
          <div className="score-carousel-container-stats">
            <Carousel children={games} show={4} infiniteLoop={true}/>
          </div>
          <div className="middle-container">
            <div className="table-container">
              <div className="header">
                <h3>Stats</h3>
              </div>
              <ReactTable columns={columns} data={stats} allPlayers={true}/>
              <PlayerModal open={modal} setOpen={setModal} playerID={playerID} player={spotlightPlayer}/>
            </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Stats;