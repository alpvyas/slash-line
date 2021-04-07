import React, { useState, useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_leagues } from "../../store/createLeague";
import LeagueFormModal from "../LeagueFormModal";
import NavBar from "../NavBar/index";
import Table from "../Table";
import "./Homepage.css";

const Homepage = () => {
  const user = useSelector((state) => state.session.user);
  const [leagues, setLeagues] = useState([])
  const dispatch = useDispatch();
  
  useEffect(async () => {
    
    dispatch(get_leagues(user.id))
    .then(data => setLeagues(data["leagues"]));

    }, [user])

  const columns = ["League Name", "League Type", "Permissions",
                   "Draft", "Draft Date", "Draft Time"];

  const row_keys = ["name", "type", "permissions", "draft",
                "draft_date", "draft_time"];

  return (
    <>
      <div className="container page-container">
        <NavBar />
        <div className="create-league-container">
          <LeagueFormModal />
        </div>
        <div>
          <Table columns={columns} rows={leagues} row_keys={row_keys}/>
        </div>
      </div>
    </>
  )
}

export default Homepage;