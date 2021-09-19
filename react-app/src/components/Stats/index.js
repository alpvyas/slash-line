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
import LandingModal from "../LandingModal";
import SidebarModal from "../Sidebar/SidebarModal";
import { game_details } from "../../mock_game_data";
import { get_single_player_stats } from "../../store/stats";
import SplashNav from "../SplashNav";


const Stats = () => {
  const dispatch = useDispatch();
  const stats = useSelector(state => state.stats.stats.stats);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [spotlightPlayer, setSpotlightPlayer] = useState({});
  const [playerID, setPlayerID] = useState("");

  const [playerModal, setPlayerModal] = useState(false);
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
    setPlayerModal(true);
  }

  const handleSignup = () => {
    if (login) setLogin(false);
    setSignup(true);
    setOpen(true);
  };

  const handleLogin = () => {
    if (signup) setSignup(false);
    setLogin(true);
    setOpen(true);
  };

  const handleSidebarModal = () => {
    setSidebarOpen(true);
  };

  // if (user && authenticated && !newUser) {
  //   return (
  //     <Redirect to="/home" />
  //   )
  // };

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
          <SplashNav handleLogin={handleLogin} handleSignup={handleSignup} setModal={setModal} handleSidebarModal={handleSidebarModal}/>
          <LandingModal
          open={open}
          setOpen={setOpen}
          signup={signup}
          setSignup={setSignup}
          login={login}
          setLogin={setLogin}
        />
        <SidebarModal 
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          modal={modal}
        />
          <div className="score-carousel-container-stats">
            {games && <Carousel children={games} show={4} infiniteLoop={true}/>}
          </div>
          <div className="middle-container">
            <div className="table-container">
              <div className="header">
                <h3>Stats</h3>
              </div>
              {stats && <ReactTable columns={columns} data={stats} allPlayers={true}/>}
              {playerModal && <PlayerModal open={playerModal} setOpen={setPlayerModal} playerID={playerID} player={spotlightPlayer}/>}
            </div>
          </div>
        <Footer />
      </div>
    </>
  )
}

export default Stats;