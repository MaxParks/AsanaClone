import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDashboardThunk } from '../../store/dashboard'
import '../../assets/icons/collapse-caret.svg'
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg'
import { ReactComponent as Checkmark } from '../../assets/icons/checkmark.svg'
import { ReactComponent as NotificationBell } from '../../assets/icons/notification-bell.svg'
import { ReactComponent as PlusButton } from '../../assets/icons/plus.svg'

import './Sidebar.css' // import the corresponding CSS file

const Sidebar = () => {
  const [isTeamsCollapsed, setIsTeamsCollapsed] = useState(true)
  const toggleTeams = () => {
    setIsTeamsCollapsed(!isTeamsCollapsed)
  }

  const dashboardData = useSelector(state => state.dashboard)
  console.log('DASHBOARD DATA --->', dashboardData)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDashboardThunk())
  }, [dispatch])

  return (
    <div className='sidebar-content'>
      <div>
        <h1 className='sidebar-header'>ZenFlow</h1>
      </div>
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
      <div className='sidebar-teams'>
        <div className='sidebar-tab' onClick={toggleTeams}>
          <p>Teams</p>
          <div className='second-tab-item centered'>
            <PlusButton />
          </div>
        </div>

          <ul className='team-list'>
            {dashboardData.teams &&
              Object.values(dashboardData.teams).map(team => (
                <li key={team.id}>
                  <Link to={`/teams/${team.id}`}>{team.name}</Link>
                </li>
              ))}
          </ul>

      </div>
    </div>
  )
}

export default Sidebar
