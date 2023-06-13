// Constants
const LOAD_DASHBOARD = 'dashboard/loadDashboard'
const UPDATE_TASK = 'dashboard/updateTask'

// Action creators
export const loadDashboard = data => ({
  type: LOAD_DASHBOARD,
  payload: data
})

export const updateTask = task => ({
  type: UPDATE_TASK,
  payload: task
})

// Thunks
export const getDashboardThunk = () => async dispatch => {
  const response = await fetch('/api/dashboard/')

  if (response.ok) {
    const data = await response.json()
    dispatch(loadDashboard(data))
    return data
  }
}

export const updateTaskThunk = (taskId, taskData) => async dispatch => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })

  if (response.ok) {
    const updatedTask = await response.json()
    dispatch(updateTask(updatedTask)) // Dispatch the updateTask action
    return updatedTask
  } else {
    // Handle error case
  }
}

// Initial state
const initialState = {}

// Reducer
export default function dashboardReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_TASK: {
      const { payload: updatedTask } = action
      const updatedAssignedTasks = { ...state.assigned_tasks }
      updatedAssignedTasks[updatedTask.id] = updatedTask

      return {
        ...state,
        assigned_tasks: updatedAssignedTasks
      }
    }
    default:
      return state
  }
}
