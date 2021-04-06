import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { team_ids, get_roster_40 } from "../../store/players";

const Players = () => {
  const dispatch = useDispatch();
  const [LAD, setLAD] = useState({})

  useEffect(async () => {
    const team_id = team_ids["LAD"].id;
    
    dispatch(get_roster_40(team_id))
    .then(data => setLAD(data));

    }, [])

  return (
    <div className="container page-container">
      {console.log("LAD 40 MAN ROSTER:", LAD)}
    </div>
  )
}

export default Players;