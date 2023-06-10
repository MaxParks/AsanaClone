import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSingleTeamThunk } from '../../store/teams'
import './Team.css'

const Team = ({ teamId }) => {
  const dispatch = useDispatch()
  const teamData = useSelector(state => state.teams.selectedTeam)
  const history = useHistory()

  useEffect(() => {
    dispatch(getSingleTeamThunk(teamId))
  }, [dispatch, teamId])

  if (!teamData) {
    return <div>Loading...</div>
  }

  const handleAddMemberClick = () => {
    alert('Feature coming soon')
  }

  const handleProjectClick = projectId => {
    history.push(`/projects/${projectId}`)
  }

  const getInitials = (firstName, lastName) => {
    const capitalizedFirstLetter = firstName.charAt(0).toUpperCase()
    const capitalizedLastLetter = lastName.charAt(0).toUpperCase()
    return `${capitalizedFirstLetter}${capitalizedLastLetter}`
  }

  return (
    <div className='team-page'>
      <div className='members-section'>
        <h2 className='section-heading'>
          Members
          <hr className='section-line' />
        </h2>
        <div className='member-list-page'>
          {teamData.members.map(member => (
            <>
            <div key={member.id} className='member-initials-page'>
              <span className='member-icon-page'>
                {getInitials(member.firstName, member.lastName)}
              </span>
              <div className='member-tooltip'>{member.email}</div>
            </div>
              <span className='member-name-page'>{member.firstName}</span>
            </>
          ))}
          <button className='add-member-button' onClick={handleAddMemberClick}>
            +
          </button>
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
    </div>
  )
}

export default Team;
