import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_roster_40, teams } from "../../store/players";
import { game_details } from "../../mock_game_data";
import NavBar from "../NavBar";
import Carousel from "../Carousel";
import Scorecard from "../Containers/Scorecard";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
// import Table from "../Table";
import "./Players.css";
import kershaw_warmup from "../../images/kershaw-warmup-stretch.png";
import houser_bunt from "../../images/houser-bunt.png";
import glove_closeup from "../../images/close-up-baseball-held-glove.png";


const Players = () => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.players)

  const columns = useMemo(() => [
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
    },
    {
      Header: "Weight",
      accessor: "weight",
    },
    {
      Header: "DOB",
      accessor: "birth_date",
    },
  ], []);

  // const get_players_by_pos = (players, positions) => {
  //   const position_players = players.filter(player => positions.includes(player["position_txt"]))

  //   return position_players;
  // };

  useEffect(() => {
    dispatch(get_roster_40())
  
    }, [dispatch])

    // style={{backgroundImage: `url(${glove_closeup})`}}

    const games = game_details&&game_details.map((game_detail) => (
    <Scorecard game={game_detail}/>
  ));

  return (
    
      <div className="page-container" style={{backgroundImage: `url(${houser_bunt})`}}>
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
        </div>
        <div className="bottom-container">
           <div className="misc-container"></div>
           <div className="misc-container"></div>
         </div>
        <div className="footer-container">
          <Footer />
         </div>
        {/* <Table 
        columns={["Pitchers",  "Position", "Team", "Bats", "Throws", "Height", "Weight", "DOB"]}
        rows={get_players_by_pos(players, ["P"])}
        row_keys={["name_display_first_last", "position_txt", "team_name", "bats", "throws", "height_feet", "weight", "birth_date"]}
        />
        <Table 
        columns={["Catchers",  "POS", "TEAM", "B/T", "HT", "WT", "DOB"]}
        rows={get_players_by_pos(players, ["C"])}
        row_keys={["name_display_first_last", "position_txt", "team_name", "bats", "throws", "height_feet", "weight", "birth_date"]}
        />
        <Table 
        columns={["Infielders",  "POS", "TEAM", "B/T", "HT", "WT", "DOB"]}
        rows={get_players_by_pos(players, ["1B", "2B", "3B", "SS"])}
        row_keys={["name_display_first_last", "position_txt", "team_name", "bats", "throws", "height_feet", "weight", "birth_date"]}
        />
        <Table 
        columns={["Outfielders",  "POS", "TEAM", "B/T", "HT", "WT", "DOB"]}
        rows={get_players_by_pos(players, ["LF", "RF", "CF", "OF"])}
      row_keys={["name_display_first_last", "position_txt", "team_name", "bats", "throws", "height_feet", "weight", "birth_date"]}
        /> */}
      </div>
  )
}

export default Players;