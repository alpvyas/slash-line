import React from "react"
import { NavLink } from "react-router-dom"
import "./Sidebar.css"

const Sidebar = ({setShowSidebar})=>{
    
    return (
        <div className="sidebar__container">
                <div className="close_sidebar" onClick={()=>setShowSidebar(false)}><i className="fas fa-times"></i></div>
                <ul>
                    <li><NavLink to="/whywhatevernote" >ABOUT</NavLink></li>
                    <li><NavLink to="/features">FEATURES</NavLink></li>
                    <li><NavLink to="/features">COMMING SOON</NavLink></li>
                    <li> <NavLink to="/login">LOG OUT</NavLink></li>
                </ul>

        </div>
    )
}
export default Sidebar