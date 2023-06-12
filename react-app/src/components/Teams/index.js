import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
  getSingleTeamThunk,
  updateTeamThunk,
  createTeamMemberThunk
} from '../../store/teams'
import { useModal } from '../../context/Modal'
import OpenModalButton from '../OpenModalButton'
import AddTeamMemberModal from './AddTeamMemberModal'
import ProfileButton from '../Navigation/ProfileButton'

import './Team.css'
import loadingGif from '../../assets/images/Eclipse-1s-200px.gif'

const Team = () => {
  const { teamId } = useParams() || {}
  const teamData = useSelector(state => state.teams.selectedTeam)
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal, showModal } = useModal()

  const [editMode, setEditMode] = useState(false)
  const [updatedName, setUpdatedName] = useState('')
  const [newMemberEmail, setNewMemberEmail] = useState('')

  // get single team
  useEffect(() => {
    if (teamId) {
      dispatch(getSingleTeamThunk(teamId))
    }
  }, [dispatch, teamId])

  // edit team name
  useEffect(() => {
    if (teamData) {
      setUpdatedName(teamData.name)
    }
  }, [teamData])

  const handleUpdateName = () => {
    dispatch(updateTeamThunk(teamData.id, { name: updatedName }))
    setEditMode(false)
  }

  const handleNewMemberSubmit = async e => {
    e.preventDefault()
    if (newMemberEmail) {
      const response = await dispatch(
        createTeamMemberThunk(teamData.id, newMemberEmail)
      )
      if (response && response.error) {
        // Handle error if needed
        console.log(response.error)
      } else {
        setNewMemberEmail('')
        closeModal()
      }
    }
  }

  const handleProjectClick = projectId => {
    history.push(`/projects/${projectId}`)
  }

  const getInitials = (firstName, lastName) => {
    const capitalizedFirstLetter = firstName.charAt(0).toUpperCase()
    const capitalizedLastLetter = lastName.charAt(0).toUpperCase()
    return `${capitalizedFirstLetter}${capitalizedLastLetter}`
  }

  if (!teamData) {
    return (
      <div className='loading-container'>
        <img src={loadingGif} alt='Loading...' className='loading-gif' />
      </div>
    )
  }

  return (
    <div className='team-page'>
      <div className='header-container1'>
        <h1 className='header-title1'>
          {editMode ? (
            <input
              type='text'
              value={updatedName}
              onChange={e => setUpdatedName(e.target.value)}
            />
          ) : (
            teamData.name
          )}
        </h1>
        <ProfileButton user={sessionUser} />
      </div>
      <div className='members-section'>
        <h2 className='section-heading'>
          Members
          <hr className='section-line' />
        </h2>
        <div className='member-list-page'>
          {teamData.members.map(member => (
            <React.Fragment key={member.id}>
              <div className='member-initials-page'>
                <span className='member-icon-page'>
                  {getInitials(member.firstName, member.lastName)}
                </span>
                <div className='member-tooltip'>{member.email}</div>
              </div>
              <span className='member-name-page'>{member.firstName}</span>
            </React.Fragment>
          ))}
          <div className='add-member-button'>
            <OpenModalButton
              modalComponent={<AddTeamMemberModal teamId = { teamId } />}
              className='add-team'
            />
          </div>
        </div>
      </div>
      <div className='projects-section'>
        <h2 className='section-heading'>
          Projects
          <hr className='section-line' />
        </h2>
        <ul className='project-list-page'>
          {teamData.projects.length === 0 ? (
            <li className='project-item-page'>
              <span className='no-projects-message'>No projects yet</span>
            </li>
          ) : (
            teamData.projects.map(project => (
              <li
                key={project.id}
                className='project-item'
                onClick={() => handleProjectClick(project.id)}
              >
                <span className='project-icon-page'></span>
                <span className='project-name-page'>{project.name}</span>
              </li>
            ))
          )}
        </ul>
      </div>
      {editMode ? (
        <div>
          <button onClick={handleUpdateName}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <button className='edit-name-button' onClick={() => setEditMode(true)}>
          Edit Name
        </button>
      )}
    </div>
  )
}

export default Team
