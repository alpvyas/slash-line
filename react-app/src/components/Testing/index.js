import React from "react";
import Sidebar from "../Sidebar"


const Testing = () => {

  const items = [
    {name: "about", label: "About"},
    {
      name: "coming-soon", 
      label: "Coming Soon",
      items: [
        { name: "baseline", label: "Down the Baseline" },
        { name: "feedback", label: "Feedback" },
      ],
    },
    {
      name: "settings",
      label: "Settings",
      items: [
        { name: "profile", label: "Profile" },
        { 
          name: "display",
          label: "Display",
          items: [
            {name: "dark-mode", label: "Dark Mode"}
          ],
        },
        {
          name: "notifications",
          label: "Notifications",
          items: [
            {name: "email", label: "Email"},
            {name: "mobile", label: "Text message"}
          ],
        },
      ]
    },
    {name: "thanks", label: "Thanks"},
  ]

  return (
    <>
      <h1>Testing Page</h1>
      <Sidebar items={items} />
    </>
  )
};

export default Testing;