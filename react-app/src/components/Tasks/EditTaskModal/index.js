import React, { useState, useEffect } from 'react'
import {
  createTaskThunk,
  fetchTaskById,
  updateSingleTask
} from '../../../store/tasks'
import { getProjectThunk } from '../../../store/projects'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleTeamThunk } from '../../../store/teams'
import { getProjectsThunk } from '../../../store/projects'
import { getDashboardThunk } from '../../../store/dashboard'
import { useModal } from '../../../context/Modal'
import { useHistory } from 'react-router-dom'

import '../AddTaskModal/AddTaskModal.css'

function EditTaskModal ({ task, projectId }) {
  const { id, assigned_to, completed } = task
  const dispatch = useDispatch()
  const history = useHistory()

  const dashboardData = useSelector(state => state.dashboard)
  const taskData = useSelector(state => state.tasks)
  const projectData = useSelector(state => state.projects)
  const teamsData = useSelector(state => state.teams.selectedTeam)
  const [project_id, setProjectId] = useState(projectData.id)
  const [errors, setErrors] = useState([])
  const { closeModal } = useModal()

  const teams = Object.values(dashboardData.teams)

  const [isCompleted, setIsCompleted] = useState(completed)

  const initialAssignedTo = assigned_to
    ? `${assigned_to.first_name} ${assigned_to.last_name}`
    : ''
  const [assignedTo, setAssignedTo] = useState(initialAssignedTo)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTaskById(task.id))
      await dispatch(getProjectThunk(projectId))
    }

    fetchData()
  }, [dispatch, task.id, projectId])

  const teamMembersArray = Object.keys(projectData.team_members).map(key => {
    const member = projectData.team_members[key]
    return {
      id: key,
      name: `${member.firstName} ${member.lastName}`
    }
  })

  const [name, setName] = useState(taskData[task.id].name)
  const [description, setDescription] = useState(taskData[task.id].description)
  const [due_date, setDueDate] = useState(
    new Date(taskData[task.id].due_date).toLocaleDateString('en-CA')
  )
  const [teamMembers, setTeamMembers] = useState(teamMembersArray)

  const handleSubmit = async e => {
    e.preventDefault()

    const errors = {}
    if (!name) {
      errors.name = 'Name is a required field.'
    }
    if (!project_id) {
      errors.project_id = 'Project ID is a required field.'
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }

    setErrors({})

    // const formattedDueDate = due_date
    //   ? new Date(due_date).toLocaleDateString('en-US', {
    //       month: '2-digit',
    //       day: '2-digit',
    //       year: 'numeric'
    //     })
    //   : null

    const newTask = {
      id: task.id, // Include the task ID in the updated task object
      name,
      description,
      assigned_to,
      due_date,
      completed,
      project_id
    }

    try {
      await dispatch(updateSingleTask(task.id, newTask))
      await dispatch(getDashboardThunk())
      closeModal()
    } catch (error) {
      // Handle error if needed
      console.error(error)
    }
  }

  return (
    <div className='add-task-modal-container'>
      <h2>Edit task for '{projectData.name}'</h2>
      <form onSubmit={handleSubmit}>
        <ul className='error-list'>
          {errors.name && <li>{errors.name}</li>}
          {errors.project_id && <li>{errors.project_id}</li>}
        </ul>
        <div className='form-field'>
          <input
            type='text'
            id='name'
            placeholder='task name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='form-field'>
          <textarea
            id='description'
            placeholder='task description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='task-textarea'
          />
        </div>

        <select
          id='assignedTo'
          placeholder='Assigned to'
          value={assigned_to}
          onChange={e => setAssignedTo(e.target.value)}
        >
          <option value=''>{assigned_to}</option>
          {teamMembers.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <div className='form-field'>
          <input
            type='date'
            id='dueDate'
            value={due_date}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className='button-container'>
          <button type='submit' className='create-button'>
            Update Task
          </button>
          <button type='button' className='cancel-button' onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTaskModal
