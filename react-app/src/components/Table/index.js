import React from "react";
import { useSelector} from "react-redux";

import "./Table.css";

const Table = ({columns, rows, row_keys}) => {
  const user = useSelector(state => state.session.user);
  
  return (
    <>
      <table className="dodgers-table">
        <thead>
          <tr>
            {columns.map((title) => (
              <th>{title}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              {row_keys.map((key) => (
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