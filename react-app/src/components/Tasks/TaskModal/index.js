import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById } from "../../../store/tasks";
import { formatDueDate } from "../../../utils";
import "./TaskModal.css";

function TaskModal({ task, onClose }) {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard);
  const taskData = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskById(task.id));
  }, [dispatch]);

  const assignedToUser = taskData[task.id]?.assigned_to;
  const assignedToFirstName = assignedToUser ? assignedToUser.first_name : "";
  const assignedToLastName = assignedToUser ? assignedToUser.last_name : "";

  const initials = `${assignedToFirstName.charAt(0)}${assignedToLastName.charAt(
    0
  )}`;

  const project = taskData[task.id]?.project;
  return (
    <div className="task-modal-content">
      <div className="task-content">
        <div className="task-header">
          <h3>{task.name}</h3>
        </div>
        <div className="task-top-section">
          <div>
            <p className="task-label">Assignee</p>
            <div className="task-assigned-to-icon">
              <p className="user-icon">{initials}</p>
              <p>{assignedToFirstName}</p>
            </div>
          </div>
          <div>
            <p className="task-label">Due Date</p>
            <p>{formatDueDate(task.due_date)}</p>
          </div>
        </div>
        <div className="task-description-section">
          <p className="task-label">Description</p>
          <p>{task.description}</p>
        </div>
        <div className="task-comments-section"></div>
      </div>
    </div>
  );
}

export default TaskModal;
