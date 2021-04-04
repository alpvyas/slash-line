import React, { useState } from "react";
import { Drawer, Divider, IconButton } from "@material-ui/core";
import ReorderIcon from "@material-ui/icons/Reorder";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./SidebarDrawer.css";
import { List, ListItem, ListItemIcon, ListItemText } 
    from '@material-ui/core';
import PermContactCalendarIcon from 
    '@material-ui/icons/PermContactCalendar';
import AccountCircleIcon from 
    '@material-ui/icons/AccountCircle';
const styles = {

};

const SidebarDrawer = (items) => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggle = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
        <div>
          <IconButton onClick={toggle}>
            { !drawerOpen ? <ReorderIcon /> : null }
          </IconButton>
        </div>
        <Divider />
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={closeDrawer}
      >
        {/* <Sidebar items={items} /> */}
        <Link to='/about' style={styles.link}>
            <List>
              <ListItem button key='About Us'>
                <ListItemIcon><AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText primary='About Us' />
              </ListItem>
            </List>
          </Link>
          <Link to='/contact' style={styles.link}>
          <List>
            <ListItem button key='Contact Us'>
              <ListItemIcon><PermContactCalendarIcon/>
              </ListItemIcon>
              <ListItemText primary='Contact Us' />
            </ListItem>
            </List>
          </Link>
      </Drawer>
    </div>
  )
}

export default SidebarDrawer;