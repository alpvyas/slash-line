import React, { useState }from "react";
import { useDispatch, useSelector} from "react-redux";
import { joinOpenLeague } from "../../store/getStarted";
import { setSelectedTeam, setCurrentLeague } from "../../store/leagues";
import TeamModal from "../TeamModal";
import "./Table.css";

const Table = ({ columns, rows, row_keys, teams, leagues, joinOpen }) => {
  const dispatch = useDispatch();
  const userLeagues = useSelector(state => state.leagues.leagues);
  const currentLeague = useSelector(state => state.leagues.current);
  const [team, setTeam] = useState("");
  const [teamModal, setTeamModal] = useState(false);

  const generateKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  };

  const selectRow = (row) => {
    if (teams) {
      const selectedTeam = currentLeague.league.teams[row.id];
      setTeam(selectedTeam);
      setTeamModal(true);
      dispatch(setSelectedTeam(selectedTeam))
    }else if (leagues) {
      dispatch(setCurrentLeague(userLeagues[row.id]))
    }else if (joinOpen) {
      dispatch(joinOpenLeague(row))
    }
  } 
  
  return (
    <>
    {/* {console.log("INSIDE TABLE: ", rows[0])} */}
      {teamModal && <TeamModal open={teamModal} setOpen={setTeamModal} team={team}/>}
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
            <tr className="non-header-row" key={ generateKey() } onClick={() => selectRow(row)}>
              {row_keys.map((key) => (
                <td key={ generateKey() }>{row[key]}</td>
              ))}
              
              {leagues && <td key={ generateKey() }>
                <button type="button" className="select-league-button">Select League</button>
              </td>}

              {teams && <td key={ generateKey() }>
                <button type="button" className="view-details-button">View Details</button>
              </td>}

              {joinOpen && <td key={ generateKey() }>
                <button type="button" className="join-league-button">Join This League</button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;