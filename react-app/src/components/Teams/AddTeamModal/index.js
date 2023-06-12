import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { createTeamThunk } from '../../../store/teams'
import { useModal } from '../../../context/Modal'
import { useHistory } from 'react-router-dom'

import './AddTeamModal.css'

function AddTeamModal ({ teamData }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [members, setMembers] = useState('')
  const [errors, setErrors] = useState([])
  const history = useHistory()
  const { closeModal } = useModal()
  const sessionUser = useSelector(state => state.session.user)

  const handleSubmit = async e => {
    e.preventDefault()

    const memberEmails = members.split(',').map(email => email.trim())

    const teamMembers = teamData.members.map(member => member.email)
    const currentUserEmail = sessionUser.email

    const duplicateMembers = memberEmails.filter(
      email => teamMembers.includes(email) || email === currentUserEmail
    )

    if (duplicateMembers.length > 0) {
      setErrors([
        'Some members are already on the team or the owner cannot be added'
      ])
      return
    }

    const data = await dispatch(createTeamThunk(name, memberEmails))

    if (data && data.id) {
      closeModal()
      history.push('/teams')
    } else if (data) {
      setErrors(data)
    } else {
      closeModal()
    }
  }

  return (
    <div className='create-team-modal-container'>
      <h2>Create New Team</h2>
      <form onSubmit={handleSubmit}>
        <ul className='error-list'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='form-field-create-team'>
          <label htmlFor='name'>Team Name</label>
          <input
            type='text'
            id='name'
            placeholder='Team name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='form-field-create-team'>
          <label htmlFor='members'>
            Members (comma-separated email addresses)
          </label>
          <textarea
            id='members'
            placeholder='Enter member emails separated by commas'
            value={members}
            onChange={e => setMembers(e.target.value)}
          ></textarea>
        </div>
        <div className='button-container'>
          <button
            type='submit'
            className='create-button'
            disabled={errors.length > 0}
          >
            Create Team
          </button>
          <button type='button' className='cancel-button' onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTeamModal
