import React, { useState }from "react";
import { useDispatch, useSelector} from "react-redux";
import { selectedTeam, setCurrentLeague } from "../../store/leagues";

import "./Table.css";

const Table = ({ columns, rows, row_keys, teams, leagues }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const currentLeague = useSelector(state => state.leagues.current);

  const setLeague = (league) => {
    dispatch(setCurrentLeague(league))
  }

  const selectTeam = (team) => {
    if (teams) {

      const selected = currentLeague.teams[team.id];

      dispatch(selectedTeam(selected))
    }

  }
  
  return (
    <>
    {/* {console.log("INSIDE TABLE: ", rows[0])} */}
      <table className="dodgers-table">
        <thead>
          <tr>
            {columns.map((title) => (
              <th>{title}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} onClick={() => selectTeam(row)}>
              {row_keys.map((key) => (
                // console.log("KEY: ", row.key)
                <td>{row[key]}</td>
              ))}
              
              {leagues && <td>
                <button type="button" onClick={() => setLeague(row)
                                      }>Select League</button>
              </td>}

              {teams && <td>
                <button type="button" onClick={() => selectTeam(row)
                                      }>View Details</button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;