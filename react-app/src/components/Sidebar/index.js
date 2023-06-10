import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getDashboardThunk } from '../../store/dashboard'
import '../../assets/icons/collapse-caret.svg'
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as Checkmark } from '../../assets/icons/checkmark.svg'
import { ReactComponent as NotificationBell } from '../../assets/icons/notification-bell.svg'
import { ReactComponent as PlusButton } from '../../assets/icons/plus.svg'
import './Sidebar.css'
import TeamDropdown from '../Teams/TeamDropdown'
import AddTeamModal from '../Teams/AddTeamModal'
import OpenModalButton from '../OpenModalButton'

const Sidebar = ({
  openTeamDropdown,
  selectedTeamId,
  selectedTeamData,
  closeTeamDropdown
}) => {
  const dashboardData = useSelector(state => state.dashboard)
  const [openDropdowns, setOpenDropdowns] = useState([])
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getDashboardThunk())
  }, [dispatch])

const toggleTeamDropdown = teamId => {
  const index = openDropdowns.indexOf(teamId)
  if (index !== -1) {
    // Remove the teamId from openDropdowns if it's already open
    setOpenDropdowns(openDropdowns.filter(id => id !== teamId))
    history.push('/') // Update URL to remove team id
    openTeamDropdown(null, null)
  } else {
    // Close the currently open dropdown if any
    const currentlyOpenDropdown = openDropdowns[0]
    if (currentlyOpenDropdown) {
      setOpenDropdowns(openDropdowns.filter(id => id !== currentlyOpenDropdown))
      closeTeamDropdown()
    }

    // Add the teamId to openDropdowns if it's closed
    setOpenDropdowns([teamId])
    // history.push(`/teams/${teamId}`) // Update URL with the selected team id
    const teamData = dashboardData.teams[teamId]
    openTeamDropdown(teamId, teamData)
  }
}

  return (
    <div className='sidebar-content'>
      <div>
        <h1 className='sidebar-header'>ZenFlow</h1>
      </div>
      <div className='sidebar-navigation-container'>
        {/* Navigation items */}
        <div className='sidebar-navigation-container'>
          <ul className='sidebar-navigation'>
            <div className='sidebar-tab'>
              <HomeIcon />
              <li className='second-tab-item'>Home</li>
            </div>
            <div className='sidebar-tab'>
              <Checkmark />
              <li className='second-tab-item'>My Tasks</li>
            </div>
            <div className='sidebar-tab'>
              <NotificationBell />
              <li className='second-tab-item'>Inbox</li>
            </div>
          </ul>
        </div>
      </div>
      <div className='sidebar-teams'>
        <div className='sidebar-tab'>
          <p>Teams</p>
          <div className='second-tab-item centered'>
            {/* Add Team button */}
            {/* <PlusButton /> */}
            <OpenModalButton
              modalComponent={<AddTeamModal />}
              className='add-team'
            />
          </div>
        </div>
        <ul className='team-list'>
          {dashboardData.teams &&
            Object.values(dashboardData.teams).map(team => (
              <li key={team.id}>
                <div
                  className={`team-name${
                    selectedTeamId === team.id ? ' active' : ''
                  }`}
                  onClick={() => toggleTeamDropdown(team.id)}
                >
                  <span
                    className={`team-arrow${
                      openDropdowns.includes(team.id) ? ' rotated' : ''
                    }`}
                  ></span>
                  {team.name}
                </div>
                {/* Team dropdown */}
                {selectedTeamId === team.id && (
                  <div className='team-dropdown'>
                    <TeamDropdown
                      teamId={team.id}
                      teamData={selectedTeamData}
                      closeTeamDropdown={closeTeamDropdown}
                    />
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
