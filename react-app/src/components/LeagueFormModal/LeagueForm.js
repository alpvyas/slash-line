import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LeagueForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [permissions, setPermissions] = useState("");
  const [draft, setDraft] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [draftTime, setDraftTime] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const createLeague = await dispatch(createLeague(name, type, permissions, draft, draftDate, draftTime)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
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
          <input
            type="text"
            name="type"
            value={type}
            placeholder="Rotisserie"
            onChange={updateType}
            required
          />
        </label>
        <label>
          Permissions
          <input
            type="text"
            name="permissions"
            value={permissions}
            placeholder="Comissioner Only"
            onChange={updatePermissions}
            required
          />
        </label>
        <label>
          Draft
          <input
            type="text"
            name="draft"
            value={type}
            placeholder="Live Standard Draft"
            onChange={updateDraft}
            required
          />
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