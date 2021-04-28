import React, { useEffect, useState } from "react";
import Scorecard from "../Containers/Scorecard";
// import { get_game_details } from "../../store/gameDetails";
import { game_details } from "../../mock_game_data";
import "./NiceCarousel.css";



const NiceCarousel = () => {

  const games = game_details&&game_details.map((game_detail) => (
    <Scorecard game={game_detail}/>
  ));

  const keys = Array(games.length).keys();
  const length = games.length;

  const [items, setItems] = useState(keys);
  const [isTicking, setIsTicking] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const bigLength = games.length;

  const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const prevClick = (jump = 1) => {
    if(!isTicking) {
      setIsTicking(true);
      setItems(prev => {
        return prev.map((_, i) => prev[(i + jump) % bigLength])
      })
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems(prev => {
        return prev.map((_, i) => prev[(i - jump) % bigLength])
      })
    }
  };

  const handleDotClick = index => {
    if (index < activeIndex) prevClick(activeIndex - index);
    if (index > activeIndex) nextClick(index - activeIndex);
  };

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-inner">
        {/* <button className="carousel-btn carousel-btn-prev" onClick={() => prevClick()}>
          < i className="carousel-btn-arrow carousel-btn-arrow-left" />
        </button> */}
        <div className="carousel-container">
          <div className="carousel-games-list">
            {games}
          </div>
        </div>
        {/* <button className="carousel-btn carousel-btn-next" onClick={() => nextClick()}>
          <i className="carousel-btn-arrow carousel-btn-arrow-right" />
        </button> */}
        {/* <div className="dots">
          {items.slice(0, length).map((pos, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={i === activeIndex ? "dot active" : "dot"}
              />
          ))}
        </div> */}
      </div>
    </div>
  )

};

export default NiceCarousel;