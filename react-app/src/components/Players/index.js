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
import { get_single_player_stats } from "../../store/stats";
import { game_details } from "../../mock_game_data";
import Button from '@material-ui/core/Button';
import PlayerModal from "../PlayerModal";
import SidebarModal from "../Sidebar/SidebarModal";
import SplashNav from "../SplashNav";


const Players = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const league = useSelector(state => state.leagues.current)
  const players = useSelector(state => state.players.players);

  const [spotlightPlayer, setSpotlightPlayer] = useState({});
  const [playerID, setPlayerID] = useState("");

  const [playerModal, setPlayerModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarModal = () => {
    setSidebarOpen(true);
  };

  const getStats = async (player) => {
    const playerStats = await dispatch(get_single_player_stats(player))

    setSpotlightPlayer(playerStats);
    setPlayerID(player.mlb_player_id);
    setPlayerModal(true);
  }

 const addPlayer = (player) => {
    const response = dispatch(add_player(player, user.id, league.id))
  }

  const columns = useMemo(( date, bday, day, month, year) => [
    {
      Header: "Player",
      accessor: "full_name",
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
          <SplashNav setModal={setModal} handleSidebarModal={handleSidebarModal}/>
          <SidebarModal 
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          modal={modal}
        />
        </div>
        <div className="score-carousel-container-players">
          {games && <Carousel children={games} show={4} infiniteLoop={true}/>}
        </div>
        <div className="middle-container">
          <div className="table-container">
             <div
              className="header-description"
              style={{display: "flex", flexDirection: "column", 
              justifyContent: "center"}}
            >
               <h3>
                Players
              </h3>
              <h5>
                Player information is updated daily. Select on a player's name
                to get more information about that player.
              </h5>
             </div>
            {players && <ReactTable columns={columns} data={players} allPlayers={true} getStats={getStats}/>}
            {playerModal && <PlayerModal open={playerModal} setOpen={setPlayerModal} playerID={playerID} player={spotlightPlayer}/>}
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
  )
};

export default Players;