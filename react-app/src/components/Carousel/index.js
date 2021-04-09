import React, { useEffect, useState } from "react";
import Scorecard from "../Container"; //when I get rid of this it messes up the stying of the scorecards. why?
import "./Carousel.css";


const Carousel = ({ items, show, infiniteLoop}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(items.length);
  const [isRepeating, setIsRepeating] = useState(infiniteLoop && items > show);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

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

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {currentIndex > 0 && (
          <button className="left-arrow" onClick={prev}>
            &lt;
          </button>
          )}
          <div className="carousel-content-wrapper">
            <div className={`carousel-content show-${show}`} 
             style={{ transform: `translateX(-${currentIndex * (100 / show)}%)`,
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
          <button className="right-arrow" onClick={next}>
            &gt;
          </button>
          )}
        </div>
      </div>
    </>
  )
};

export default Carousel;