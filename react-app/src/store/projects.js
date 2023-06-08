// Constants
const LOAD_PROJECTS = "projects/loadProject";
const ROJECT = "projects/createProject";
const UPDATE_PROJECT = "projects/updateProject";
const REMOVE_PROJECT = "projects/REMOVE_PROJECT";

// Action creators
const loadProject = (data) => ({
  type: LOAD_PROJECTS,
  payload: data,
});

const createProject = (data) => ({
  type: ADD_PROJECT,
  payload: data,
});

const updateProject = (projectId, data) => ({
  type: UPDATE_PROJECT,
  data: {
    id: projectId,
    ...data,
  },
});

const removeProject = (projectId) => ({
  type: REMOVE_PROJECT,
  payload: projectId,
});

// Thunk actions
export const getProjectThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/projects/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadProject(data));
    return data;
  }
};

export const createProjectThunk =
  (name, description, due_date, team_id) => async (dispatch) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, due_date, team_id }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createProject(data));
      return data;
    }
  };

export const updateProjectThunk =
  (projectId, updatedProjectData) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProjectData),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(updateProject(projectId, data));
      return data;
    }
  };

export const deleteProject = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    dispatch(removeProject(id));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

// Initial state
const initialState = {};

// Reducer
export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        ...action.payload,
      };
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
