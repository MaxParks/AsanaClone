// Constants
const LOAD_DASHBOARD = 'dashboard/LOAD_DASHBOARD';

// Action creators
const loadDashboard = (dashboard) => ({
  type: LOAD_DASHBOARD,
  payload: dashboard,
});

// Thunk action
export const fetchDashboard = () => async (dispatch) => {
  try {
    const response = await fetch('/api/dashboard');
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    const data = await response.json();
    dispatch(loadDashboard(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

// Initial state
const initialState = {
  teams: [],
  projects: [],
  tasks: [],
};

// Reducer
export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD:
      return {
        ...state,
        teams: action.payload.teams,
        projects: action.payload.projects,
        tasks: action.payload.tasks,
      };
    default:
      return state;
  }
}
