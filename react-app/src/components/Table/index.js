import React, { useState }from "react";
import { useSelector} from "react-redux";

import "./Table.css";

const Table = ({columns, rows, row_keys, button}) => {
  const user = useSelector(state => state.session.user);
  // console.log("ROWS: ", rows)
  const [currentLeague, setCurrentLeague] = useState();
  
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
                <button type="button" onClick={() => {setCurrentLeague(row.id)
                console.log("Current League Set", currentLeague)}}>Set Current League</button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;