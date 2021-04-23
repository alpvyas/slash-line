import React from "react";
import { useSelector} from "react-redux";

import "./Table.css";

const Table = ({columns, rows, row_keys}) => {
  const user = useSelector(state => state.session.user);
  
  return (
    <>
    {console.log("INSIDE TABLE: ", rows)}
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;