import React, { memo, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import { Drawer, Divider, IconButton } from "@material-ui/core";
import {logout} from "../../store/session"
import ReorderIcon from "@material-ui/icons/Reorder";
import { NavLink, Redirect, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";

const styles = {
  sideNav: {
    marginTop: '10px',
    zIndex: 3,
    marginLeft: '15px',
    position: 'relative',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  },
  container: {
      width: '750px',
  },
  hamburger: {
    borderRadius: '100%',
  },
};

const SidebarItem = ({ expanded, item, depthStep = 25, depth =0, ...rest }) => {
    const [collapsed, setCollapsed] = useState(true);
    const { name, label, items, Icon, setModal, handleSidebarModal } = item;

    const toggle = () => {
        setCollapsed(value => !value)
    }

    const onClick = () => {
        if (Array.isArray(items)) {
            toggle();
        }else{
            setModal(name);
            handleSidebarModal();
        }
    }

    let expandIcon;

    if (Array.isArray(items) && items.length) {
        expandIcon = !collapsed ? (
            <ExpandLessIcon className="expand-arrow expand-arrow-expanded"/>
        ) : (
            <ExpandMoreIcon className="expand-arrow" />
        );
    }

    return (
        <>
            <ListItem 
            button
            className="sidebar-item"
            dense
            onClick={() => onClick()}
            {...rest}
            >
                <div
                    style={{ paddingLeft: depth * depthStep }}
                    className="item-content"
                >
                    {/* {Icon && <Icon className="item-icon" fontSize="small" />} */}
                    <div className="item-text">{label}</div>
                </div>
                {expandIcon}
            </ListItem>
            <Collapse in={!collapsed} timeout="auto" unmountOnExit>
                {Array.isArray(items) ? (
                    <List disablePadding dense>
                        {items.map((subItem, index) => (
                            <React.Fragment key={`${subItem.name}${index}`}>
                                {subItem === "divider" ? (
                                    <Divider style={{ margin: "6px 0" }} />
                                ) : (
                                    <SidebarItem
                                        depth={depth + 1}
                                        depthStep={depthStep}
                                        item={subItem}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : null}
            </Collapse>
        </>
    )
};

const Sidebar = ({ modal, setModal, items, depthStep = 25, depth =0, expanded }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);

  const onLogout = async (e) => {
    e.preventDefault()
    const response = await dispatch(logout())
    if (response) {
        localStorage.clear("token")
        history.replace("/")
        return <Redirect to="/" />
    }
  };

  const toggle = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
    return (
        <>
            <div style={styles.sideNav}>
                <IconButton
                className="hamburger-icon" style={styles.hamburger} onClick={toggle}>
                    { !drawerOpen ? <ReorderIcon fontSize="large" /> : null }
                </IconButton>
            </div>
            <Divider />
            <Drawer
                variant="temporary"
                anchor="right"
                open={drawerOpen}
                onClose={closeDrawer}
            >
                <div className="sidebar-container" style={styles.container}>
                    <List disablePadding dense>
                        {user && <NavLink to={`/profile/users/${user.id}`} >
                            <ListItem
                                button
                                className="sidebar-item"
                                dense
                                // onClick={onLogout}
                            >
                                <div
                                    style={{ paddingLeft: depth * depthStep }}
                                    className="item-content"
                                >
                                    <div className="item-text">Profile</div>
                                </div>
                            </ListItem>
                        </NavLink>}

                        {items.map((sidebarItem, index) => (
                            <React.Fragment key={`${sidebarItem.name}${index}`}>
                                {sidebarItem === "divider" ? (
                                    <Divider style={{ margin: "6px 0" }} />
                                ) : (
                                    <SidebarItem
                                        depthStep={depthStep}
                                        depth={depth}
                                        expanded={expanded}
                                        item={sidebarItem}
                                    />
                                )}
                            </React.Fragment>
                        ))}

                        {/* <ListItem to="/">
                            <LogoutButton />
                        </ListItem> */}

                        {user && <NavLink to="/">
                            <ListItem
                                button
                                className="sidebar-item"
                                dense
                                onClick={onLogout}
                            >
                                <div
                                    style={{ paddingLeft: depth * depthStep }}
                                    className="item-content"
                                >
                                    <div className="item-text">Logout</div>
                                </div>
                            </ListItem>
                        </NavLink>}
                    </List>
                </div>
            </Drawer>
        </>
    )
};

export default memo(Sidebar);