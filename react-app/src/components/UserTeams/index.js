import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
import glove_ball from "../../images/close-up-baseball-held-glove.png";
import "./UserTeams.css";
import InjuredList from "../Containers/InjuredList";
import { add_to_IL } from "../../store/userTeams";
import PlayerDetail from "../PlayerDetails";
import { get_single_player_stats } from "../../store/stats";
import Scorecard from "../Containers/Scorecard";
import Carousel from "../Carousel";
import { game_details } from "../../mock_game_data";
import SplashNav from "../SplashNav";
import SidebarModal from "../Sidebar/SidebarModal";
import PlayerModal from "../PlayerModal";



const MyTeam = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const leagues = useSelector(state => state.leagues.leagues);
  const userTeams = useSelector(state => state.userTeams.teams);
  const currentLeague = useSelector(state => state.leagues.current.league)
  const [currentTeam, setCurrentTeam] = useState(undefined);
  // const [currentLeague, setCurrentLeague] = useState(undefined);
  const [spotlightPlayer, setSpotlightPlayer] = useState({});
  const [spotlightName, setSpotlightName] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [playerModal, setPlayerModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarModal = () => {
    setSidebarOpen(true);
  };

  // console.log("CL TEAM PAGE: ", currentLeague)
  // console.log("CT TEAM PAGE: ", currentTeam)
  useEffect(() => {
      if (currentLeague !== undefined) {
        // console.log("CL: ", currentLeague)
        const leagueID = currentLeague.info["id"]
        // console.log("LEAGUE ID ", leagueID)
        setCurrentTeam(userTeams[leagueID])
      }
    }, [dispatch, currentLeague, userTeams]);

  const addToIL = (player) => {
    const response = dispatch(add_to_IL(player))
    // console.log("RESPONSE ", response)
  }

  const getStats = async (player) => {
    const response = await dispatch(get_single_player_stats(player))
    setSpotlightPlayer(response);
    setSpotlightName(player.full_name);
    setPlayerID(player.mlb_player_id);
    setPlayerModal(true);
    
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
      <div
        className="page-container"
        style={{backgroundImage: `url(${glove_ball})`}}
      >
        <SplashNav
          setModal={setModal}
          handleSidebarModal={handleSidebarModal}
        />
        <SidebarModal 
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          modal={modal}
        />
        <div className="score-carousel-container-players">
          {games && <Carousel children={games} show={4} infiniteLoop={true}/>}
        </div>
        <div className="middle-container">
          <div className="table-container">
            <div
              className="header-description"
              style={{display: "flex", flexDirection: "column",
              justifyContent: "center"}}>
              <h3>
                Your Teams
              </h3>
              <h5>
                Select a team to see its roster.
              </h5>
            </div>
            {currentTeam &&
              <ReactTable 
                columns={columns}
                data={currentTeam.players.active}
              />}
            {playerModal && 
              <PlayerModal
                open={playerModal}
                setOpen={setPlayerModal}
                playerID={playerID}
                player={spotlightPlayer}
              />}
          </div>
          <div className="table-container">
             <div
              className="header-description"
              style={{display: "flex", flexDirection: "column", 
              justifyContent: "center"}}
            >
               <h3>
                Injured List
              </h3>
              <h5>
                You can place a player on the Injured List if you need more
                room on the roster. The max you can have on the IL is 10
                players. A player will be automatically placed on the IL if their
                MLB status changes to IL.
              </h5>
             </div>
             {currentTeam &&
              <InjuredList
                players={currentTeam.players.injured}
              />}
           </div>
         </div>
         <div className="footer-container">
          <Footer />
         </div>
         </div>
    </>
  )

};

export default MyTeam;