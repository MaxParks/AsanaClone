// Constants
const LOAD_PROJECTS = 'projects/LOAD_PROJECTS';
const ADD_PROJECT = 'projects/ADD_PROJECT';
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT';
const REMOVE_PROJECT = 'projects/REMOVE_PROJECT';

// Action creators
const loadProjects = (projects) => ({
  type: LOAD_PROJECTS,
  payload: projects,
});

const addProject = (project) => ({
  type: ADD_PROJECT,
  payload: project,
});

const updateProject = (project) => ({
  type: UPDATE_PROJECT,
  payload: project,
});

const removeProject = (projectId) => ({
  type: REMOVE_PROJECT,
  payload: projectId,
});

// Thunk actions
export const fetchProject = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/projects${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await response.json();
    dispatch(loadProjects(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const createProject = (name, description, due_date, team_id) => async (dispatch) => {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, due_date, team_id }),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    const data = await response.json();
    dispatch(addProject(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const updateSingleProject = (id, name, description, due_date) => async (dispatch) => {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, due_date }),
    });
    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    const data = await response.json();
    dispatch(updateProject(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    dispatch(removeProject(id));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

// Initial state
const initialState = [];

// Reducer
export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECTS:
      return action.payload;
    case ADD_PROJECT:
      return [...state, action.payload];
    case UPDATE_PROJECT:
      return state.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
    case REMOVE_PROJECT:
      return state.filter((project) => project.id !== action.payload);
    default:
      return state;
  }
}
