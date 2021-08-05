import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import Carousel from "../Carousel";
import houser_bunt from "../../images/houser-bunt.png";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
import "./Stats.css";
import Scorecard from "../Containers/Scorecard";
import { game_details } from "../../mock_game_data";

const Stats = () => {
  const stats = useSelector(state => state.stats.stats.stats);

  // const game_details = useSelector(state => state.gameDetails.gameDetails);
  const gameDetails = game_details;

  const games = gameDetails&&gameDetails.map((game_detail) => (
    <Scorecard game={game_detail}/>
  ));

  const columns = useMemo(() => [
    {
      Header: "Player",
      accessor: "full_name",
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
            </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Stats;