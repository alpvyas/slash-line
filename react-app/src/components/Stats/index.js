import React from "react";
import { games } from "../../mock_game_data";
import NavBar from "../NavBar";
import Carousel from "../Carousel";
import baseball_glove_dirt from "../../images/baseball-glove-dirt.png";

const Stats = () => {

  return (
    <>
      <div className="container page-container" style={{backgroundImage: `url(${baseball_glove_dirt})`}}>
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