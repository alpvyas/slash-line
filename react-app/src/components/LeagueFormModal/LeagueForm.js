import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLeague } from "../../store/createLeague"

function LeagueForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [permissions, setPermissions] = useState("");
  const [draft, setDraft] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [draftTime, setDraftTime] = useState("");
  const [errors, setErrors] = useState([]);

  const user_id = useSelector(state => state.session.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    await dispatch(createLeague(user_id, name, type, permissions, draft, draftDate, draftTime))
      // .catch(async (res) => {
      //   console.log("THIS IS RES", res)
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
      // }
    // );
  };

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

  return (
    <div className="form-container">
      <div className="form-header">
        <span>Create your league now.</span>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          League Name
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Cactus League"
            onChange={updateName}
            required
          />
        </label>
        <label>
          League Type
          <select name="type" onChange={updateType}>
            <option value="rotisserie">Rotisserie</option>
            <option value="points-only">Points Only</option>
            <option value="h2h">Head-to-Head</option>
            <option value="h2h-points">Head-to-Head - Points</option>
          </select>
        </label>
        <label>
          Permissions
          {/* <input
            type="text"
            name="permissions"
            value={permissions}
            placeholder="Comissioner Only"
            onChange={updatePermissions}
            required
          /> */}
          <select name="permissions" onChange={updatePermissions}>
            <option value="Commissioner">Comissioner Only</option>
            <option value="all-managers">All Managers Can Invite</option>
          </select>
        </label>
        <label>
          Draft
          {/* <input
            type="text"
            name="draft"
            value={type}
            placeholder="Live Standard Draft"
            onChange={updateDraft}
            required
          /> */}
          <select name="draft" onChange={updateDraft}>
            <option value="live-standard">Live Standard Draft</option>
            <option value="live-salary">Live Salary Cap Draft</option>
            <option value="auto">Auto-pick Draft</option>
            <option value="offline">Offline Draft</option>
          </select>
        </label>
        <label>
          Draft Date
          <input
            type="date"
            name="draftDate"
            value={draftDate}
            // placeholder="Rotisserie" can this be default one week from creation date?
            onChange={updateDraftDate}
            required
          />
        </label>
        <label>
          Draft Time
          <input
            type="time"
            name="draftTime"
            value={draftTime}
            // placeholder="Rotisserie" can this be default one week from creation date?
            onChange={updateDraftTime}
            required
          />
        </label>
        <button type="submit">Finish</button>
      </form>
    </div>
  );
}

export default LeagueForm;