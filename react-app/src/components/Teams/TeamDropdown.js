import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSingleTeamThunk } from '../../store/teams'
import './TeamDropdown.css'

const TeamDropdown = ({ teamId, closeTeamDropdown }) => {
  const dispatch = useDispatch()
  const teamData = useSelector(state => state.teams.selectedTeam)
  console.group('TEAM DATA --->', teamData)
  const history = useHistory()

  useEffect(() => {
    dispatch(getSingleTeamThunk(teamId))
  }, [dispatch, teamId])

  if (!teamData) {
    return <div>Loading...</div>
  }

  // function to get initials of each member to render in member icon
  const getInitials = (firstName, lastName) => {
    const capitalizedFirstLetter = firstName.charAt(0).toUpperCase()
    const capitalizedLastLetter = lastName.charAt(0).toUpperCase()
    return `${capitalizedFirstLetter}${capitalizedLastLetter}`
  }

  const handleProjectClick = projectId => {
    history.push(`/projects/${projectId}`) // Redirect to the project page
  }

  return (
    <div className='team-container'>
      <div className='member-list'>
        {teamData.members.map(member => (
          <div key={member.id} className='member-initials'>
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
      {/* <button onClick={closeTeamDropdown}>Close</button> */}
    </div>
  )
}
export default TeamDropdown
