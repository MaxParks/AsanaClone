// Constants
const LOAD_TEAMS = 'teams/LOAD_TEAMS';
const ADD_TEAM = 'teams/ADD_TEAM';
const UPDATE_TEAM = 'teams/UPDATE_TEAM';
const REMOVE_TEAM = 'teams/REMOVE_TEAM';
const INVITE_MEMBER = 'teams/INVITE_MEMBER';
// const RETRIEVE_TEAM = 'teams/RETRIEVE_TEAM';

// Action creators
const loadTeams = (teams) => ({
  type: LOAD_TEAMS,
  payload: teams,
});

const addTeam = (team) => ({
  type: ADD_TEAM,
  payload: team,
});

const updateTeam = (team) => ({
  type: UPDATE_TEAM,
  payload: team,
});

const removeTeam = (teamId) => ({
  type: REMOVE_TEAM,
  payload: teamId,
});

const inviteMember = (teamId, member) => ({
  type: INVITE_MEMBER,
  payload: { teamId, member },
});

// const retrieveTeam = (team) => ({
//   type: RETRIEVE_TEAM,
//   payload: team,
// });

// Thunk actions
export const fetchTeams = () => async (dispatch) => {
  try {
    const response = await fetch('/api/teams');
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }

    const data = await response.json();
    dispatch(loadTeams(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const createTeam = (name, members) => async (dispatch) => {
  try {
    const response = await fetch('/api/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, members }),
    });
    if (!response.ok) {
      throw new Error('Failed to create team');
    }

    const data = await response.json();
    dispatch(addTeam(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const updateSingleTeam = (id, name, newMember) => async (dispatch) => {
  try {
    const response = await fetch(`/api/teams/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, new_member: newMember }),
    });
    if (!response.ok) {
      throw new Error('Failed to update team');
    }

    const data = await response.json();
    dispatch(updateTeam(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const deleteTeam = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/teams/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete team');
    }

    dispatch(removeTeam(id));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const inviteSingleMember = (teamId, email) => async (dispatch) => {
  try {
    const response = await fetch(`/api/teams/${teamId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to invite team member');
    }

    const data = await response.json();
    dispatch(inviteMember(teamId, data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

// export const retrieveSingleTeam = (id) => async (dispatch) => {
//   try {
//     const response = await fetch(`/api/teams/${id}`);
//     if (!response.ok) {
//       throw new Error('Failed to retrieve team');
//     }

//     const data = await response.json();
//     dispatch(retrieveTeam(data));
//   } catch (error) {
//     console.error(error);
//     // Handle error if needed
//   }
// };

// Initial state
const initialState = [];

// Reducer
export default function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TEAMS:
      return action.payload;
    case ADD_TEAM:
      return [...state, action.payload];
    case UPDATE_TEAM:
      return state.map((team) =>
        team.id === action.payload.id ? action.payload : team
      );
    case REMOVE_TEAM:
      return state.filter((team) => team.id !== action.payload);
    case INVITE_MEMBER:
      return state.map((team) =>
        team.id === action.payload.teamId
          ? {
              ...team,
              members: [...team.members, action.payload.member],
            }
          : team
      );
    // case RETRIEVE_TEAM:
    //   return state.map((team) =>
    //     team.id === action.payload.id ? action.payload : team
    //   );
    default:
      return state;
  }
}
