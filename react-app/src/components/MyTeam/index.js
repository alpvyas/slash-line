import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import ReactTable from "../ReactTable";
import Footer from "../Footer";
import dodgers_cap from "../../images/dodgers-cap-glove.png";
import sunset_field from "../../images/sunset-field.png";
import holding_balls from "../../images/player-holding-balls.png";
import glove_ball from "../../images/close-up-baseball-held-glove.png";
import "./MyTeam.css";
import InjuredList from "../Containers/InjuredList";
import { add_to_IL } from "../../store/myTeam";
import { Table } from "@material-ui/core";
import PlayerDetail from "../PlayerDetails";
import { get_single_player_stats, get_stats_from_backend } from "../../store/stats";

const MyTeam = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const players = useSelector(state => state.userTeam.userTeam);
  const [spotlightPlayer, setSpotlightPlayer] = useState({});
  const [spotlightName, setSpotlightName] = useState("");

  const addToIL = (player) => {
    const response = dispatch(add_to_IL(player))
    console.log("RESPONSE ", response)
  }

  const getStats = async (player) => {
    const response = await dispatch(get_single_player_stats(player))
    setSpotlightPlayer(response);
    setSpotlightName(player.name_display_first_last)
    console.log("Player Stats: ", response)
  }

 const columns = useMemo((height, date, bday, day, month, year) => [
    {
      Header: "Player",
      accessor: "name_display_first_last",
      Cell: props => (
        <button onClick={() => getStats(props.row.original)}>
          {props.row.original.name_display_first_last}
        </button>
      ),
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
      Cell: props => (
        height = `${props.row.original.height_feet}${"'"}${props.row.original.height_inches}`
      ),
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

  // const players_data = [
  //                   {
  //                     name_display_first_last:"Cody Bellinger",
  //                     team_name: "Los Angeles Dodgers",
  //                     bats: "L",
  //                     throws: "L",
  //                     height_feet: "6'4",
  //                     weight: "203",
  //                     birth_date: "07/13/1995",
  //                     position_txt: "RF",
  //                   },
  //                   {
  //                     name_display_first_last:"Gerrit Cole",
  //                     team_name: "New York Yankees",
  //                     bats: "R",
  //                     throws: "R",
  //                     height_feet: "6'4",
  //                     weight: "220",
  //                     birth_date: "09/08/1990",
  //                     position_txt: "SP",
  //                   },
  //                   {
  //                     name_display_first_last:"Mike Trout",
  //                     team_name: "Los Angeles Angels",
  //                     bats: "R",
  //                     throws: "r",
  //                     height_feet: "6'2",
  //                     weight: "235",
  //                     birth_date: "08/07/1991",
  //                     position_txt: "CF",
  //                   },
  //                   {
  //                     name_display_first_last:"Mookie Betts",
  //                     team_name: "Los Angeles Dodgers",
  //                     bats: "R",
  //                     throws: "R",
  //                     height_feet: "5'9",
  //                     weight: "180",
  //                     birth_date: "10/07/1992",
  //                     position_txt: "RF",
  //                   },
  //                   {
  //                     name_display_first_last:"Matt Chapman",
  //                     team_name: "Oakland Athletics",
  //                     bats: "R",
  //                     throws: "R",
  //                     height_feet: "6'0",
  //                     weight: "215",
  //                     birth_date: "04/128/1993",
  //                     position_txt: "3B",
  //                   },
  //                   {
  //                     name_display_first_last:"Trevor Story",
  //                     team_name: "Colorado Rockies",
  //                     bats: "R",
  //                     throws: "R",
  //                     height_feet: "6'2",
  //                     weight: "213",
  //                     birth_date: "11/15/1992",
  //                     position_txt: "SS",
  //                   },
  //                   {
  //                     name_display_first_last:"Brandon Lowe",
  //                     team_name: "Tampa Bay Rays",
  //                     bats: "L",
  //                     throws: "R",
  //                     height_feet: "5'10",
  //                     weight: "185",
  //                     birth_date: "07/06/1994",
  //                     position_txt: "2B",
  //                   },
  //                   {
  //                     name_display_first_last:"Buster Posey",
  //                     team_name: "San Francisco Giants",
  //                     bats: "R",
  //                     throws: "R",
  //                     height_feet: "6'1",
  //                     weight: "213",
  //                     birth_date: "03/27/1987",
  //                     position_txt: "C",
  //                   },
  //                   {
  //                     name_display_first_last:"Max Muncy",
  //                     team_name: "Los Angeles Dodgers",
  //                     bats: "L",
  //                     throws: "R",
  //                     height_feet: "6'0",
  //                     weight: "215",
  //                     birth_date: "08/25/1990",
  //                     position_txt: "1B",
  //                   },
  // ];

  return (
    <>
    {console.log("SPOTLIGHT PLAYER IN STATE: ", spotlightPlayer)}
      <div className="page-container" style={{backgroundImage: `url(${glove_ball})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        {/* <div className="score-carousel-container-players">
          {games && <Carousel items={games} show={5} infiniteLoop={true}/>}
        </div> */}
        <div className="middle-container">
          <div className="table-container">
            <div className="header">
              <h3>Players</h3>
            </div>
            <ReactTable columns={columns} data={players}/>
          </div>
        </div>
        <div className="bottom-container">
           <div className="misc-container">
             <div className="section-header">
               <h3>Player Spotlight</h3>
             </div>
             <PlayerDetail player={spotlightPlayer} name={spotlightName}/>
           </div>
           <div className="misc-container">
             <div className="section-header">
               <h3>Injured List</h3>
             </div>
             <InjuredList />
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