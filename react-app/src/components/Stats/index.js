import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { games } from "../../mock_game_data";
import NavBar from "../NavBar";
import Carousel from "../Carousel";
import baseball_glove_dirt from "../../images/baseball-glove-dirt.png";
import houser_bunt from "../../images/houser-bunt.png";
import { get_season_hitting_stats, get_stats_from_backend } from "../../store/stats";
import ReactTable from "../ReactTable";
import Footer from "../Footer";

const Stats = () => {
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.players);
  
  // const playersLAD = players.filter(player => player.team_abbrev === "LAD")
  const stats = useSelector(state => state.stats.stats);

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

  const season = "2021";
  const gameType = "R";
  // // const playerID = "641355"
  // const players = [641355, 571970, 572041, 608369, 621035, 457759, 605131]


  useEffect(() => {
    dispatch(get_stats_from_backend())
  }, [dispatch]);


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
        <div className="footer-container">
          <Footer />
         </div>
      </div>
    </>
  )
}

export default Stats;