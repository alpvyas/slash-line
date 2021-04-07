import React from "react";
import Sidebar from "../Sidebar";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";


const Testing = () => {

  const onClick = (e, item) => {
  window.alert(JSON.stringify(item, null, 2));
  };

  const items = [
    {name: "about", label: "About", onClick},
    {
      name: "coming-soon", 
      label: "Coming Soon",
      items: [
        { name: "baseline", label: "Down the Baseline", onClick },
        { name: "feedback", label: "Feedback", onClick },
      ],
    },
    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      items: [
        { name: "profile", label: "Profile", onClick },
        { 
          name: "display",
          label: "Display",
          items: [
            {name: "dark-mode", label: "Dark Mode", onClick}
          ],
        },
        {
          name: "notifications",
          label: "Notifications",
          Icon: NotificationsIcon,
          items: [
            {name: "email", label: "Email", onClick},
            {name: "mobile", label: "Text message", onClick}
          ],
        },
      ]
    },
    {name: "thanks", label: "Thanks", onClick},
  ]

  return (
    <>
      <h1>Testing Page</h1>
      <Sidebar items={items} />
    </>
  )
};

export default Testing;