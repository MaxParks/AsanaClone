import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSingleTeamThunk } from '../../store/teams'

import './TeamDropdown.css'
import loadingGif from '../../assets/images/Eclipse-1s-200px.gif'

const TeamDropdown = ({ teamId, closeTeamDropdown, selectedTeamData }) => {
  const dispatch = useDispatch()
  const teamData = useSelector(state => state.teams.selectedTeam)
  const history = useHistory()

  useEffect(() => {
    dispatch(getSingleTeamThunk(teamId))
  }, [dispatch, teamId])

  if (!teamData) {
    return (
      <div className='loading-container'>
        <img src={loadingGif} alt='Loading...' className='loading-gif' />
      </div>
    )
  }

  const getInitials = (firstName, lastName) => {
    const capitalizedFirstLetter = firstName.charAt(0).toUpperCase()
    const capitalizedLastLetter = lastName.charAt(0).toUpperCase()
    return `${capitalizedFirstLetter}${capitalizedLastLetter}`
  }

  const handleProjectClick = projectId => {
    history.push(`/projects/${projectId}`)
  }

  return (
    <div className='team-container'>
      <div className='member-list'>
        {teamData.members.map((member, index) => (
          <div
            key={member.id}
            className={`member-initials${teamData ? ' show' : ''}`}
            style={{ transitionDelay: `${index * 0.3}s` }}
          >
            {getInitials(member.firstName, member.lastName)}
            <div className='member-tooltip'>{member.email}</div>
          </div>
        ))}
      </div>
      <ul className='project-list'>
        {teamData.projects.length === 0 ? (
          <li className='project-item'>
            <span className='no-projects-message'>No projects yet</span>
          </li>
        ) : (
          teamData.projects.map(project => (
            <li
              key={project.id}
              className='project-item'
              onClick={() => handleProjectClick(project.id)}
            >
              <span className='project-icon'>&#9670;</span>
              <span className='project-name'>{project.name}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default TeamDropdown;
