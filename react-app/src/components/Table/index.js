import React, { useState }from "react";
import { useDispatch, useSelector} from "react-redux";
import { joinOpenLeague } from "../../store/getStarted";
import { selectedTeam, setCurrentLeague } from "../../store/leagues";

import "./Table.css";

const Table = ({ columns, rows, row_keys, teams, leagues, joinOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const currentLeague = useSelector(state => state.leagues.current);

  const generateKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  };

  const selectRow = (row) => {
    if (teams) {
      const selected = currentLeague.teams[row.id];
      dispatch(selectedTeam(selected))
    }else if (leagues) {
      dispatch(setCurrentLeague(row))
    }else if (joinOpen) {
      dispatch(joinOpenLeague(row))
    }
  } 
  
  return (
    <>
    {/* {console.log("INSIDE TABLE: ", rows[0])} */}
      <table className="dodgers-table">
        <thead>
          <tr key={ generateKey() }>
            {columns.map((title) => (
              <th key={ generateKey() }>{title}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={ generateKey() } onClick={() => selectRow(row)}>
              {row_keys.map((key) => (
                // console.log("KEY: ", row.key)
                <td key={ generateKey() }>{row[key]}</td>
              ))}
              
              {leagues && <td key={ generateKey() }>
                <button type="button">Select League</button>
              </td>}

              {teams && <td key={ generateKey() }>
                <button type="button">View Details</button>
              </td>}

              {joinOpen && <td key={ generateKey() }>
                <button type="button">Join This League</button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;