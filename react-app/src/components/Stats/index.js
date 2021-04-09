import React from "react";
import { games } from "../../mock_game_data";
import NavBar from "../NavBar";
import Carousel from "../Carousel";

const Stats = () => {

  return (
    <>
      <div className="container page-container">
          <div className="nav-bar-container">
            <NavBar />
          </div>
          <div className="score-carousel-container">
            <Carousel items={games} show={5} infiniteLoop={true}/>
          </div>
      </div>
    </>
  )
}

export default Stats;