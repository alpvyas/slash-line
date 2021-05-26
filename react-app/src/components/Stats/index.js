import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { games } from "../../mock_game_data";
import NavBar from "../NavBar";
import Carousel from "../Carousel";
import houser_bunt from "../../images/houser-bunt.png";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
import "./Stats.css";

const Stats = () => {
  const players = useSelector(state => state.players.players);
  
  const stats = useSelector(state => state.stats.stats.stats);

  const columns = useMemo(() => [
    {
      Header: "Player",
      accessor: "name",
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
          <div className="score-carousel-container">
            <Carousel items={games} show={5} infiniteLoop={true}/>
          </div>
          <div className="middle-container">
            <div className="table-container">
              <div className="header">
                <h3>Stats</h3>
              </div>
              <ReactTable columns={columns} data={stats}/>
            </div>
        </div>
      </div>
      <div className="footer-container">
          <Footer />
         </div>
    </>
  )
}

export default Stats;