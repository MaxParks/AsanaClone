import { updateSingleTask } from "./store/tasks";

export const toggleTaskCompletion = async (
  taskId,
  data,
  dispatch,
  updateSingleTask
) => {
  const task = Object.values(data).find((task) => task.id === taskId);

  if (task) {
    const updatedTask = {
      name: task.name,
      description: task.description,
      assigned_to: task.assigned_to,
      due_date: task.due_date,
      completed: task.completed ? false : true,
      project_id: task.project_id,
    };

    dispatch(updateSingleTask(taskId, updatedTask));
  }
};

export function formatDueDate(dueDate) {
  const currentDate = new Date();
  const taskDate = new Date(dueDate);

  const isSameDay =
    currentDate.getDate() === taskDate.getDate() &&
    currentDate.getMonth() === taskDate.getMonth() &&
    currentDate.getFullYear() === taskDate.getFullYear();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isSameDay) {
    return "today";
  } else if (
    taskDate.getDate() === tomorrow.getDate() &&
    taskDate.getMonth() === tomorrow.getMonth() &&
    taskDate.getFullYear() === tomorrow.getFullYear()
  ) {
    return "tomorrow";
  } else if (taskDate < currentDate) {
    return "past due";
  } else {
    return taskDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  }
}
