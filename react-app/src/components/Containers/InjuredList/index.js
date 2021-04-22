import React, { useState } from "react";
import Table from "../../Table";

const InjuredList = () => {

  const addToActive = () => {

  }

  const removeILButton = 
    <button onClick={() => addToActive()}>
          Remove from IL
    </button>

  const changeStatus = 
    <button onClick={() => addToActive()}>
          Change IL Status
    </button>

  const players = [
                    {
                      name_display_first_last:"Cody Bellinger",
                      position_txt: "RF",
                      il_status: "IL-10",
                      date_added: "04/10/2021",
                      change_status: changeStatus,
                      remove_button: removeILButton,
                    },
                    {
                      name_display_first_last:"Cody Bellinger",
                      position_txt: "RF",
                      il_status: "IL-10",
                      date_added: "04/10/2021",
                      change_status: changeStatus,
                      remove_button: removeILButton,
                    },
                    {
                      name_display_first_last:"Cody Bellinger",
                      position_txt: "RF",
                      il_status: "IL-10",
                      date_added: "04/10/2021",
                      change_status: changeStatus,
                      remove_button: removeILButton,
                    },
                  ]

  const columns = ["Player", "Position", "IL Status", "Date Added", "", ""];
  const row_keys = ["name_display_first_last", "position_txt", "il_status", "date_added", "change_status", "remove_button"]

  return (
    <>
      <div className="il-container">
        <Table columns={columns} rows={players} row_keys={row_keys}/>
      </div>
    </>
  )
};

export default InjuredList;