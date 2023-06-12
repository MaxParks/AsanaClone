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
import DeleteTeamModal from './DeleteTeamModal'
import ProfileButton from '../Navigation/ProfileButton'
import { ReactComponent as ProjectIcon } from '../../assets/icons/project-icon.svg'

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

  // edit team name
  const handleUpdateName = () => {
    dispatch(updateTeamThunk(teamData.id, { name: updatedName }))
    setEditMode(false)
  }

  // redirect user to project page from team page
  const handleProjectClick = projectId => {
    history.push(`/projects/${projectId}`)
  }

  // get member initials to render in member icon
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
        {sessionUser && sessionUser.id === teamData.owner_id && (
          <OpenModalButton
            modalComponent={<DeleteTeamModal teamData={teamData} />}
            className='delete-team-button'
          >
            Delete
          </OpenModalButton>
        )}

        <ProfileButton user={sessionUser} />
      </div>
      <div className='members-section'>
        <h2 className='section-heading'>
          Members
          <hr className='section-line' />
        </h2>
        <div className='member-list-page'>
          {sessionUser && sessionUser.id === teamData.owner_id && (
            <div className='add-member-button'>
              <OpenModalButton
                modalComponent={<AddTeamMemberModal teamData={teamData} />}
                className='add-team'
              />
              <div className='add-member-text'>
                <span>Add</span>
                <span>Member</span>
              </div>
            </div>
          )}

          {teamData.members.map((member, index) => (
            <React.Fragment key={member.id}>
              <div className='member-item-page'>
                {/* Member icon and tooltip */}
                <div className='member-initials-page'>
                  {getInitials(member.firstName, member.lastName)}
                </div>
                <div className='member-tooltip'>{member.email}</div>
              </div>
              <span className='member-name-page'>
                {member.firstName.toLowerCase()}
              </span>
            </React.Fragment>
          ))}
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
                <div className='project-icon-wrapper'>
                  <ProjectIcon className='project-svg-icon' />
                </div>
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
