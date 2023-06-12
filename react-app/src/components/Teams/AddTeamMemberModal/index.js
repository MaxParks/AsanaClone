import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../../context/Modal'
import { createTeamMemberThunk } from '../../../store/teams'

function AddTeamMemberModal ({ teamId }) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const history = useHistory()
  const { closeModal } = useModal()

  const handleSubmit = async e => {
    e.preventDefault()

    const data = await dispatch(createTeamMemberThunk(teamId, email))

    if (data && data.id) {
      closeModal()
      history.push(`/teams/${teamId}`)
    } else if (data && data.message) {
      setError(data.message)
    } else {
      closeModal()
    }
  }

  return (
    <div className='add-team-member-modal-container'>
      <h2>Invite Team Member</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className='error-message'>{error}</div>}
        <div className='form-field-add-team-member'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Enter member email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='button-container'>
          <button type='submit' className='invite-button' disabled={!email}>
            Invite
          </button>
          <button type='button' className='cancel-button' onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTeamMemberModal
