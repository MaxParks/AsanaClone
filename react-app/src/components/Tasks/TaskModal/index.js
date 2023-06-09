import React from "react";

function TaskModal({ task, onClose }) {
  return (
    <div className="task-modal">
      <div className="task-modal-content">
        <h2>{task.name}</h2>
        <p>{task.assigned_to}</p>
        <p>{task.project_id}</p>
        <p>Description: {task.description}</p>
        <p>Due Date: {task.due_date}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default TaskModal;
