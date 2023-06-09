import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTeamThunk } from "../../store/teams";
import "./Team.css";

const Team = ({ teamId, closeTeamDropdown }) => {
  const dispatch = useDispatch()
  const teamData = useSelector(state => state.teams.selectedTeam)
  console.group('TEAM DATA --->', teamData)

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

  return (
    <div className='team-container'>
      <div className='member-list'>
        {teamData.members.map(member => (
          <div key={member.id} className='member-initials'>
            {getInitials(member.firstName, member.lastName)}
          </div>
        ))}
      </div>
      <ul className='project-list'>
        {teamData.projects.map(project => (
          <li key={project.id} className='project-item'>
            &#9670; {project.name}
          </li>
        ))}
      </ul>
      {/* <button onClick={closeTeamDropdown}>Close</button> */}
    </div>
  )
}

export default Team
