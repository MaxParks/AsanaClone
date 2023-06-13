import { getDashboardThunk } from "./dashboard";

// Constants
const LOAD_TASKS = "tasks/loadTasks";
const LOAD_TASK = "tasks/loadTask";
const ADD_TASK = "tasks/addTask";
const UPDATE_TASK = "tasks/updateTask";
const REMOVE_TASK = "tasks/removeTask";
const ADD_TASK_COMMENT = "tasks/addTaskComment";
const REMOVE_TASK_COMMENT = "tasks/removeTaskComment";

// Action creators
const loadTasks = (tasks) => ({
  type: LOAD_TASKS,
  payload: tasks.reduce((indexedTasks, task) => {
    indexedTasks[task.id] = task;
    return indexedTasks;
  }, {}),
});

const loadTask = (taskId) => ({
  type: LOAD_TASK,
  payload: taskId,
});

const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

const updateTask = (taskId, task) => ({
  type: UPDATE_TASK,
  payload: task,
});

const removeTask = (taskId) => ({
  type: REMOVE_TASK,
  payload: taskId,
});

const addTaskComment = (taskId, comment) => ({
  type: ADD_TASK_COMMENT,
  payload: {
    taskId,
    comment,
  },
});

const removeTaskComment = (commentId) => ({
  type: REMOVE_TASK_COMMENT,
  payload: commentId,
});

// Thunk actions
export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await fetch("/api/tasks/");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await response.json();
    dispatch(loadTasks(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const fetchTaskById = (id) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${id}`);
  if (response.ok) {
    const data = await response.json();
    console.log("TASK STORE DATA -->", data);
    dispatch(loadTask(data));
    return data;
  }
};

export const createTaskThunk = (taskData) => async (dispatch) => {
  const { name, description, assigned_to, due_date, project_id } = taskData;

  const response = await fetch("/api/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      assigned_to,
      due_date,
      project_id,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addTask(data));
    dispatch(getDashboardThunk());
    return data;
  }
};

export const updateSingleTask = (id, taskData) => async (dispatch) => {
  const { name, description, assigned_to, due_date, completed, project_id } =
    taskData;

  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      description,
      assigned_to,
      due_date: due_date ? due_date.split("/").reverse().join("-") : null,
      completed,
      project_id,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    dispatch(updateTask(id, data));
    // dispatch(getDashboardThunk())
    return data;
  } else {
    // Handle errors
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    dispatch(removeTask(id));
    dispatch(getDashboardThunk());
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const addSingleTaskComment = (taskId, comment) => async (dispatch) => {
  console.log(comment);
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addTaskComment(taskId, data));

    return data;
  }
};

export const deleteTaskComment = (taskId, id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/tasks/comments/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task comment");
    }
    const data = await response.json();
    dispatch(removeTaskComment(id));
    dispatch(fetchTaskById(taskId));
    return data;
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

// Initial state
const initialState = {
  byId: {},
};

// Reducer
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TASKS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.payload,
        },
      };
    case LOAD_TASK:
    case ADD_TASK: {
      const { id, ...task } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: task,
        },
      };
    }
    case UPDATE_TASK:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case REMOVE_TASK: {
      const newState = { ...state };
      delete newState.byId[action.payload];
      return newState;
    }
    case ADD_TASK_COMMENT: {
      const { taskId, comment } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [taskId]: {
            ...state.byId[taskId],
            comments: [...state.byId[taskId].comments, comment],
          },
        },
      };
    }
    case REMOVE_TASK_COMMENT: {
      const { taskId, commentId } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [taskId]: {
            ...state.byId[taskId],
            comments: state.byId[taskId].comments.filter(
              (comment) => comment.id !== commentId
            ),
          },
        },
      };
    }
    default:
      return state;
  }
}
