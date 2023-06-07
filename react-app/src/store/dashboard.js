// Constants
const LOAD_DASHBOARD = "dashboard/loadDashboard";

// Action creators
const loadDashboard = (data) => ({
  type: LOAD_DASHBOARD,
  payload: data,
});

// Thunks

export const getDashboardThunk = () => async (dispatch) => {
  const response = await fetch("/api/dashboard/");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadDashboard(data));
    return data;
  }
};

// Initial state
const initialState = {};

// Reducer
export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
