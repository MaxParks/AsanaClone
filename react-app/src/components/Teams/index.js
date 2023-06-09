import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTeamThunk } from "../../store/teams";
// import "./Team.css";

function Team () {
  const dispatch = useDispatch()
  const { id } = useParams()
  const teamData = useSelector(state => state.teams.selectedTeam)
  console.log('TEAM DATA', teamData)

  useEffect(() => {
    dispatch(getSingleTeamThunk(id))
  }, [dispatch, id])

  if (!teamData) {
    return <div>Loading...</div>
  }

  // Function to get initials from a name
  const getInitials = (firstName, lastName) => {
    const capitalizedFirstLetter = firstName.charAt(0).toUpperCase()
    const capitalizedLastLetter = lastName.charAt(0).toUpperCase()
    return `${capitalizedFirstLetter}${capitalizedLastLetter}`
  }

  return (
    <div>
      <h1>Team: {teamData.name}</h1>
      <h2>Members:</h2>
      <ul>
        {teamData.members.map(member => (
          <li key={member.id}>
            {getInitials(member.firstName, member.lastName)}
          </li>
        ))}
      </ul>
      <h2>Projects:</h2>
      <ul>
        {teamData.projects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Team
