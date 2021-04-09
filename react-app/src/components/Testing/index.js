import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_game_details } from "../../store/gameDetails";
import { game_details } from "../../mock_game_data";
import Scorecard from "../Container";
import Carousel from "../Carousel";



const Testing = () => {
  const dispatch = useDispatch();
  // const game_details = useSelector(state => state.gameDetails);

  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  for (let index = 0; index < months.length; index++) {
    if (month === index) month = months[index]
  };

  if (day < 10) day = `0${day}`;

  const today = year + '-' + month + '-' + day;

  // useEffect(() => {
  //   dispatch(get_game_details())
  // })


  const games = game_details.map((game_detail) => (
    <Scorecard game={game_detail}/>
  ));
                
  return (
    <>
      {console.log("GAME DETAILS:", game_details)}
      <h1>Testing Page</h1>
      <h2>Today's Date: {today}</h2>
      <div>
        <Carousel items={games} show={5} infiniteLoop={true}/>
      </div>
      {/* <div>
        <Scorecard game={games[0]}/>
      </div> */}
    </>
  )
};

export default Testing;