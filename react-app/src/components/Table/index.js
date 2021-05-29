import React, { useState }from "react";
import { useDispatch, useSelector} from "react-redux";
import { setCurrentLeague } from "../../store/leagues";

import "./Table.css";

const Table = ({columns, rows, row_keys, button}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  // console.log("ROWS: ", rows)
  // const [currentLeague, setCurrentLeague] = useState();

  const currentLeague = useSelector(state => state.leagues.current);

  const setLeague = (league) => {
    dispatch(setCurrentLeague(league))
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
            <tr key={index}>
              {row_keys.map((key) => (
                // console.log("KEY: ", row.key)
                <td>{row[key]}</td>
              ))}
              
              {button && <td>
                <button type="button" onClick={() => setLeague(row)
                                      }>Set Current League</button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;