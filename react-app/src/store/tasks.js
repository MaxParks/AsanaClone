import { getDashboardThunk } from "./dashboard";

// Constants
const LOAD_TASKS = "tasks/loadTasks";
const LOAD_TASK = "tasks/loadTask";
const ADD_TASK = "tasks/addTask";
const UPDATE_TASK = "tasks/updateTask";
const REMOVE_TASK = "tasks/removeTask";
const ADD_TASK_COMMENT = "tasks/addTaskComment";
const UPDATE_TASK_COMMENT = "tasks/updateTaskComment";
const REMOVE_TASK_COMMENT = "tasks/removeTaskComment";

// Action creators
const loadTasks = (tasks) => ({
  type: LOAD_TASKS,
  payload: tasks,
});

const loadTask = (taskId) => ({
  type: LOAD_TASK,
  payload: taskId,
});

const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

const updateTask = (task) => ({
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

const updateTaskComment = (comment) => ({
  type: UPDATE_TASK_COMMENT,
  payload: comment,
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
  try {
    const response = await fetch(`/api/tasks/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }

    const data = await response.json();
    dispatch(loadTask(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const createTaskThunk =
  (name, description, assigned_to, due_date, completed, project_id) =>
  async (dispatch) => {
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
        completed,
        project_id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(addTask(data));
      dispatch(getDashboardThunk());

      return data;
    } else {
      throw new Error("Failed to create project");
    }
  };

export const updateSingleTask =
  (id, name, description, assigned_to, due_date, completed, project_id) =>
  async (dispatch) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          assigned_to,
          due_date,
          completed,
          project_id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data = await response.json();
      dispatch(updateTask(data));
    } catch (error) {
      console.error(error);
      // Handle error if needed
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
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const addSingleTaskComment = (taskId, comment) => async (dispatch) => {
  try {
    const response = await fetch(`/api/tasks/${taskId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    if (!response.ok) {
      throw new Error("Failed to add task comment");
    }

    const data = await response.json();
    dispatch(addTaskComment(taskId, data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const updateSingleTaskComment = (id, comment) => async (dispatch) => {
  try {
    const response = await fetch(`/api/tasks/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    if (!response.ok) {
      throw new Error("Failed to update task comment");
    }

    const data = await response.json();
    dispatch(updateTaskComment(data));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

export const deleteTaskComment = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/tasks/comments/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task comment");
    }

    dispatch(removeTaskComment(id));
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

// Initial state
const initialState = [];

// Reducer
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TASKS:
      return action.payload;
    case LOAD_TASK:
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case ADD_TASK:
      return [...state, action.payload];
    case UPDATE_TASK:
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case ADD_TASK_COMMENT:
      return state.map((task) => {
        if (task.id === action.payload.taskId) {
          return {
            ...task,
            comments: [...task.comments, action.payload.comment],
          };
        }
        return task;
      });
    case UPDATE_TASK_COMMENT:
      return state.map((task) => {
        const updatedComments = task.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        );
        return {
          ...task,
          comments: updatedComments,
        };
      });
    case REMOVE_TASK_COMMENT:
      return state.map((task) => {
        const filteredComments = task.comments.filter(
          (comment) => comment.id !== action.payload
        );
        return {
          ...task,
          comments: filteredComments,
        };
      });
    default:
      return state;
  }
}
