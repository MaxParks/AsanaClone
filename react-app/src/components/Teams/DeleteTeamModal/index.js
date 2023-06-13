import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTeamThunk } from '../../../store/teams'
import { useModal } from '../../../context/Modal'
import { useHistory } from "react-router-dom";

function DeleteTeamModal ({ teamData }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const history = useHistory();

  const handleDelete = async () => {
    await dispatch(deleteTeamThunk(teamData.id))
    history.push(`/user/dashboard`);
    closeModal()
  }

  return (
    <div className='delete-team-modal-container'>
      <h2>Delete Team</h2>
      <p>Are you sure you want to delete the team "{teamData.name}"?</p>
      <div className='button-container'>
        <button type='button' className='delete-button' onClick={handleDelete}>
          Delete
        </button>
        <button type='button' className='cancel-button' onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteTeamModal
