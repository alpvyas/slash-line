import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { closeCreateLeague, openCreateLeague } from "../../store/createLeague";
import "./CreateLeague.css";
import CreateLeagueForm from "./CreateLeagueForm";

const CreateLeagueModal = () => {
  const dispatch = useDispatch();
  const CreateModalState = useSelector(state => state?.createLeagueModal?.status);
  const [addCreateLeague, setAddCreateLeague] = useState(false);
  const [create, setCreate] = useState(false);
  
  Modal.setAppElement("#root");

  const closeModal = () => {
    dispatch(closeCreateLeague())
  };

  return (
    <>
      <Modal
        isOpen={create}
        contentLabel="Create League"
        className="defaultInner"
        overlayClassName="defaultOuter"
        onRequestClose={closeModal}
        >
        <div className="closeIcoOuterShell">
          <button className="closeIcoShell" onClick={(e) => setAddCreateLeague(false)}>
            <i className="fas fa-times closeIco"></i>
          </button>
        </div>
        <CreateLeagueForm
          // authenticated={authenticated}
          // setAuthenticated={setAuthenticated}
          create={create}
          setCreate={setCreate}
          />
      </Modal>
    </>
  )
};

export default CreateLeagueModal;