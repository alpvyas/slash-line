import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_game_details } from "../../store/gameDetails";
import { game_details } from "../../mock_game_data";
// import Scorecard from "../Containers/Scorecard";
// import Carousel from "../Carousel";
import MaterialCarousel from "../MaterialCarousel";
import GettingStartedModal from "../MaterialModal";



const Testing = () => {

  return (
    <>
      <GettingStartedModal />
    </>
  )

};

export default Testing;