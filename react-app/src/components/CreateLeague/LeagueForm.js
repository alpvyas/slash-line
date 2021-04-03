import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import logo from "../../images/logo.png";
// import * as sessionActions from "../../store/session";
import createLeague from "../../store/createLeague";

const LeagueForm = (
  // authenticated,
  // setAuthenticated,
  // setCreate
) => {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [permissions, setPermissions] = useState("");
  const [draft, setDraft] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [draftTime, setDraftTime] = useState("");

  const user = useSelector(state => state.session.user);


  const onCreate = async (e) => {
    e.preventDefault();
    if (user) {
    let createLeague = await dispatch(createLeague(name, type, permissions, draft, draftDate, draftTime))
        .catch(async (res) => {
          console.log("THIS IS RES", res)
          const data = await res.json();
        //   if (data && data.errors) setErrors(data.errors)
        })
        // setErrors(createLeague)
      }
    }

  // if (user) {
  //   return (
  //   <Redirect to="/home"/>
  // )}


  // const createButton = () => {
  //   setSignup(false);
  //   setLogin(true);
  // };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateType = (e) => {
    setType(e.target.value);
  };

  const updatePermissions = (e) => {
    setPermissions(e.target.value);
  };

  const updateDraft = (e) => {
    setDraft(e.target.value);
  };

  const updateDraftDate = (e) => {
    setDraftDate(e.target.value);
  };

  const updateDraftTime = (e) => {
    setDraftTime(e.target.value);
  };

  // const errorCheck = {} 
  
  //   errors.forEach(error => { 
  //   error = error.split(':') 
  //   errorCheck[error[0].trim()] = error[1]

  // })

  return (
    <div className="form_container">
      <div className="form-header">
        <span>Create your league now.</span>
      </div>

      <form onSubmit={onCreate} className="create-form">
        <div>
          <input
            type="text"
            name="name"
            placeholder="League Name"
            onChange={updateName}
            value={name}
          ></input>
          {/* {"leagueName" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.leagueName}</p></div> : null} */}
        </div>
        <div>
          <input
            type="text"
            name="type"
            placeholder="League Type"
            onChange={updateType}
            value={type}
          ></input>
          {/* {"leagueType" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.leagueType}</p></div> : null} */}
        </div>
        <div>
          <input
            type="text"
            name="permissions"
            placeholder="Permissions"
            onChange={updatePermissions}
            value={permissions}
          ></input>
          {/* {"permissions" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.permissions}</p></div> : null} */}
        </div>
        <div>
          <input
            placeholder="Draft"
            type="text"
            name="draft"
            onChange={updateDraft}
            value={draft}
          ></input>
          {/* {"draft" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.draft}</p></div> : null} */}
        </div>
        <div>
          <input
            placeholder="draftDate"
            type="date"
            name="draftDate"
            onChange={updateDraftDate}
            value={draftDate}
          ></input>
          {/* {"draftDate" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.draftDate}</p></div> : null} */}
        </div>
        <div>
          <input
            placeholder="Draft Time"
            type="time"
            name="draftTime"
            onChange={updateDraftTime}
            value={draftTime}
          ></input>
        </div>
        <button className="form__button" type="submit">
          Finish
        </button>
      </form>
    </div>
  )
};

export default LeagueForm;
