import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./Sidebar.css";

const Sidebar = ({setShowSidebar})=>{
    
    return (
        <div className="sidebar__container">
                <div className="close_sidebar" onClick={()=>setShowSidebar(false)}><i className="fas fa-times"></i></div>
                <ul>
                    <li><NavLink to="/about" >ABOUT</NavLink></li>
                    <li><NavLink to="/features">FEATURES</NavLink></li>
                    <li><NavLink to="/features">COMING SOON</NavLink></li>
                    <li> <LogoutButton /></li>
                </ul>

        </div>
    )
}
export default Sidebar