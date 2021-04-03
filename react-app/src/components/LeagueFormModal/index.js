import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LeagueForm from './LeagueForm';

function LeagueFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create League</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LeagueForm />
        </Modal>
      )}
    </>
  );
}

export default LeagueFormModal;