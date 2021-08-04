import React, { useEffect, useState } from "react";
import Scorecard from "../Containers/Scorecard";
import "./Carousel.css";
import { game_details } from "../../mock_game_data";


// const Carousel = ({ items, show=4, infiniteLoop=true}) => {
//   const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
//   const [length, setLength] = useState(items ? items.length : 15);

//   const [isRepeating, setIsRepeating] = useState(infiniteLoop && length > show);
//   const [transitionEnabled, setTransitionEnabled] = useState(true);

//   const [touchPosition, setTouchPosition] = useState(null);

//   const generateKey = () => {
//     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
//   };

//   // const gameDetails = useSelector(state => state.gameDetails.gameDetails);
//   // const gameDetails = game_details;
//   // const items = gameDetails&&gameDetails.map((gameDetail) => (
//   //   <Scorecard  key={ generateKey() } game={gameDetail}/>
//   // ));

//   useEffect(() => {
//     setLength(items.length);
//     setIsRepeating(infiniteLoop && items.length > show)
//   }, [items, show, infiniteLoop]);

//   useEffect(() => {
//     if (isRepeating) {
//       if (currentIndex === show || currentIndex === length) {
//       setTransitionEnabled(true);
//       }
//     }
//   }, [currentIndex, isRepeating, show, length]);

//   const next = () => {
//     if (isRepeating || currentIndex < (length - show)) {
//       setCurrentIndex(prevState => prevState + 1)
//     }
//   }

//   const prev = () => {
//     if (isRepeating || currentIndex > 0) {
//       setCurrentIndex(prevState => prevState - 1)
//     }
//   }

//   const handleTouchStart = (e) => {
//       const touchDown = e.touches[0].clientX
//       setTouchPosition(touchDown)
//   }

//   const handleTouchMove = (e) => {
//       const touchDown = touchPosition

//       if(touchDown === null) {
//           return
//       }

//       const currentTouch = e.touches[0].clientX
//       const diff = touchDown - currentTouch

//       if (diff > 5) {
//           next()
//       }

//       if (diff < -5) {
//           prev()
//       }

//       setTouchPosition(null)
//   }

//   const handleTransitionEnd = () => {
//         if (isRepeating) {
//             if (currentIndex === 0) {
//                 setTransitionEnabled(false)
//                 setCurrentIndex(length)
//             } else if (currentIndex === length + show) {
//                 setTransitionEnabled(false)
//                 setCurrentIndex(show)
//             }
//         }
//     }

//   const renderExtraPrev = () => {
//     let output = [];
//     for (let index = 0; index < show; index++) {
//       output.push(items[length - 1 - index]);
//     }
//     output.reverse();
//     return output;
//   };

//   const renderExtraNext = () => {
//     let output = [];
//     for (let index = 0; index < show; index++) {
//       output.push(items[index])
//     }
//     return output;
//   };
// // {`carousel-content show-${4}`} 
//   return (
//     <>
//       <div key={ generateKey() } className="carousel-container">

//         <div key={ generateKey() } className="carousel-wrapper">

//           {
//             (isRepeating || currentIndex > 0) && 
//             <button key={ generateKey() } className="left-arrow" onClick={prev}>
//               &lt;
//             </button>
//           }

//           <div
//             key={generateKey()}
//             className="carousel-content-wrapper"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//           >

//             <div 
//               key={generateKey()}
//               className={`carousel-content show-${show}`}
//               style={{
//                 transform: `translateX(-${currentIndex * (100)}%)`,
//                 transition: !transitionEnabled ? "none" : undefined,
//               }}

//               onTransitionEnd={() => handleTransitionEnd()}
//             >

//               {
//               (length > show && isRepeating) && renderExtraPrev()
//               }

//               {items}

//               {
//               (length > show && isRepeating) && renderExtraNext()
//               }

//             </div>
//           </div>
//           {
//             (isRepeating || currentIndex < (length - show)) && 
//             <button key={ generateKey() } className="right-arrow" onClick={next}>
//               &gt;
//             </button>
//           }
//         </div>
//       </div>
//     </>
//   )
// };


const Carousel = (props) => {
    const {children, show, infiniteLoop} = props

    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0)
    const [length, setLength] = useState(children.length)

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    const [touchPosition, setTouchPosition] = useState(null)

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
        setIsRepeating(infiniteLoop && children.length > show)
    }, [children, infiniteLoop, show])

    useEffect(() => {
        if (isRepeating) {
            if (currentIndex === show || currentIndex === length) {
                setTransitionEnabled(true)
            }
        }
    }, [currentIndex, isRepeating, show, length])

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

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false)
                setCurrentIndex(length)
            } else if (currentIndex === length + show) {
                setTransitionEnabled(false)
                setCurrentIndex(show)
            }
        }
    }

    const renderExtraPrev = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index])
        }
        output.reverse()
        return output
    }

    const renderExtraNext = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[index])
        }
        return output
    }

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {/* You can alwas change the content of the button to other things */}
                {
                    (isRepeating || currentIndex > 0) &&
                    <button onClick={prev} className="left-arrow">
                        &lt;
                    </button>
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / show)}%)`,
                            transition: !transitionEnabled ? 'none' : undefined,
                        }}
                        onTransitionEnd={() => handleTransitionEnd()}
                    >
                        {
                            (length > show && isRepeating) &&
                            renderExtraPrev()
                        }
                        {children}
                        {
                            (length > show && isRepeating) &&
                            renderExtraNext()
                        }
                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    (isRepeating || currentIndex < (length - show)) &&
                    <button onClick={next} className="right-arrow">
                        &gt;
                    </button>
                }
            </div>
        </div>
    )
}

export default Carousel;