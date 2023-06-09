import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams} from "../../store/teams"
import { getProjectThunk } from '../../store/projects'
import { getDashboardThunk } from '../../store/dashboard'
import { useParams } from "react-router-dom";
// import "./Team.css";


const Team = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const dashboardData = useSelector(state => state.dashboard)
  const teamData = dashboardData.teams ? dashboardData.teams[id] : null
  console.log('TEAM DATA --->', teamData)

  useEffect(() => {
    dispatch(getDashboardThunk())
  }, [dispatch])

  if (!teamData) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Team: {teamData.name}</h1>
      <h2>Members:</h2>
      <ul>
        {teamData.members.map(memberId => (
          <li key={memberId}>Member ID: {memberId}</li>
        ))}
      </ul>
      <h2>Projects:</h2>
      <ul>
        {teamData.projects.map(projectId => (
          <li key={projectId}>Project ID: {projectId}</li>
        ))}
      </ul>
    </div>
  )
}

export default Team
