import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_leagues } from "../../store/createLeague";
import "./Table.css";

const Table = () => {
  const user = useSelector(state => state.session.user);
  const [leagues, setLeagues] = useState([])
  const dispatch = useDispatch();

  // useEffect(async () => {
  //   let isActive = true;
    
  //   dispatch(get_leagues(user.id))
  //   .then(data => {
  //     if (isActive) {
  //       setLeagues(data);
  //     }
  //   })
  //   .catch(error => console.log(error.message));

  //   return () => {
  //     isActive = false;
  //   };
  //   }, [user])
  useEffect(async () => {
    
    dispatch(get_leagues(user.id))
    .then(data => setLeagues(data["leagues"]));

    }, [user])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>League Name</th>
            <th>Type</th>
            <th>Permissions</th>
            <th>Draft</th>
            <th>Draft Date</th>
            <th>Draft Time</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((league) => (
            <tr key={league.name}>
              <th scope="row">{league.name}</th>
              <td>{league.type}</td>
              <td>{league.permissions}</td>
              <td>{league.draft}</td>
              <td>{league.draft_date}</td>
              <td>{league.draft_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;