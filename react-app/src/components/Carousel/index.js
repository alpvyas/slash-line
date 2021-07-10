import React, { useEffect, useState } from "react";
import Scorecard from "../Containers/Scorecard"; //when I get rid of this it messes up the styling of the scorecards. why?
import "./Carousel.css";
import { game_details } from "../../mock_game_data";


const Carousel = ({ show=5, infiniteLoop=true}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(15);
  const [isRepeating, setIsRepeating] = useState(infiniteLoop && 15 > show);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const generateKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  };

  // const gameDetails = useSelector(state => state.gameDetails.gameDetails);
  const gameDetails = game_details;
  const items = gameDetails&&gameDetails.map((gameDetail) => (
    <Scorecard  key={ generateKey() } game={gameDetail}/>
  ));

  useEffect(() => {
    setLength(items.length);
    setIsRepeating(infiniteLoop && items.length > show)
  }, [items, show, infiniteLoop]);

  useEffect(() => {
    if (currentIndex === show || currentIndex === length) {
      setTransitionEnabled(true);
    }
  }, [currentIndex, isRepeating, show, length]);

  const next = () => {
    if (isRepeating || currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
  };

  const renderExtraPrev = () => {
    let output = [];
    for (let index = 0; index < show; index++) {
      output.push(items[length - 1 - index]);
    }
    output.reverse();
    return output;
  };

  const renderExtraNext = () => {
    let output = [];
    for (let index = 0; index < show; index++) {
      output.push(items[index])
    }
    return output;
  };
// {`carousel-content show-${4}`} 
  return (
    <>
      <div key={ generateKey() } className="carousel-container">
        <div key={ generateKey() } className="carousel-wrapper">
          {currentIndex > 0 && (
          <button key={ generateKey() } className="left-arrow" onClick={prev}>
            &lt;
          </button>
          )}
          <div key={ generateKey() } className="carousel-content-wrapper">
            <div key={ generateKey() } className="carousel-content"
             style={{ transform: `translateX(-${currentIndex * (120)}%)`,
                      transition: !transitionEnabled ? "none" : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
            >
              {(length > show && isRepeating) && renderExtraPrev()}
              {items}
              {(length > show && isRepeating) && renderExtraNext()}
            </div>
          </div>
          {(isRepeating || currentIndex < (length - show)) && (
          <button key={ generateKey() } className="right-arrow" onClick={next}>
            &gt;
          </button>
          )}
        </div>
      </div>
    </>
  )
};

export default Carousel;