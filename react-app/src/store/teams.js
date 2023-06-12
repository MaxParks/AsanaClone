// Constants
const LOAD_TEAMS = "teams/loadTeams";
const ADD_TEAM = "teams/addTeam";
const UPDATE_TEAM = "teams/updateTeam";
const REMOVE_TEAM = "teams/removeTeam";
const LOAD_SINGLE_TEAM = "teams/loadSingleTeam";

// Action creators
const loadTeams = (data) => ({
  type: LOAD_TEAMS,
  payload: data,
});

const addTeam = (data) => ({
  type: ADD_TEAM,
  payload: data,
});

const updateTeam = (teamId, data) => ({
  type: UPDATE_TEAM,
  data: {
    id: teamId,
    ...data,
  },
});

const removeTeam = (teamId) => ({
  type: REMOVE_TEAM,
  payload: teamId,
});

const loadSingleTeam = (data) => ({
  type: LOAD_SINGLE_TEAM,
  payload: data,
});

// Thunk actions

export const getTeamsThunk = () => async (dispatch) => {
  const response = await fetch("/api/teams/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadTeams(data));
  } else {
    // Handle error if needed
  }
};

export const getSingleTeamThunk = (teamId) => async (dispatch) => {
  const response = await fetch(`/api/teams/${teamId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSingleTeam(data));
  } else {
    // Handle error if needed
  }
};

export const createTeamThunk = (name, members) => async (dispatch) => {
  const response = await fetch("/api/teams/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, members }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTeam(data));
  } else {
    // Handle error if needed
  }
};

export const updateTeamThunk =
  (teamId, updatedTeamData) => async (dispatch) => {
    const response = await fetch(`/api/teams/${teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTeamData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateTeam(teamId, data));
    } else {
      // Handle error if needed
    }
  };

export const deleteTeamThunk = (teamId) => async (dispatch) => {
  const response = await fetch(`/api/teams/${teamId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeTeam(teamId));
  } else {
    // Handle error if needed
  }
};

// Initial state
const initialState = {};

// Reducer
export default function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TEAMS:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_TEAM:
      return {
        ...state,
        teams: {
          ...state.teams,
          [action.payload.id]: action.payload,
        },
      };
    case UPDATE_TEAM: {
      const updatedTeamData = action.data;
      const teams = state.teams || {}; // Check if teams property exists in state
      const updatedTeam = teams[updatedTeamData.id] || {}; // Check if team exists in teams

      return {
        ...state,
        teams: {
          ...teams,
          [updatedTeamData.id]: {
            ...updatedTeam,
            ...updatedTeamData,
          },
        },
      };
    }
    case REMOVE_TEAM:
      const { [action.payload]: deletedTeam, ...updatedTeams } = state.teams;
      return {
        ...state,
        teams: updatedTeams,
      };
    case LOAD_SINGLE_TEAM:
      return {
        ...state,
        selectedTeam: action.payload,
      };
    default:
      return state;
  }
}
