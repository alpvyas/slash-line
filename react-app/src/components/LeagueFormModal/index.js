import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LeagueForm from './LeagueForm';
import "./LeagueFormModal.css";

function LeagueFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create-league-btn" onClick={() => setShowModal(true)}>Create League</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LeagueForm />
        </Modal>
      )}
    </>
  );
}

export default LeagueFormModal;