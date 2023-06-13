import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskById,
  addSingleTaskComment,
  fetchTasks,
} from "../../../store/tasks";
import { getProjectThunk } from "../../../store/projects";
import { formatDueDate } from "../../../utils";
import TaskComments from "../../TaskComments/TaskComments";
import OpenModalButton from "../../OpenModalButton";
import EditTaskModal from "../EditTaskModal";
import TaskDeleteModal from "../DeleteTaskModal";
import { ReactComponent as Toolbar } from "../../../assets/icons/toolbar.svg";

import "./TaskModal.css";

function TaskModal({ task, onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const projectData = useSelector((state) => state.projects);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const projectId = task.project_id;

  const handleToolbarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const assignedToUser = task.assigned_to;
  const assignedToFirstName = assignedToUser ? assignedToUser.first_name : "";
  const assignedToLastName = assignedToUser ? assignedToUser.last_name : "";

  const initials =
    assignedToFirstName && assignedToLastName
      ? `${assignedToFirstName.charAt(0)}${assignedToLastName.charAt(0)}`
      : "";

  const isOwner = sessionUser.id === task.owner_id;
  const isProjectOwner = sessionUser.id === projectData.owner_id;

  return (
    <div className="task-modal-content">
      <div className="task-content">
        <div className="task-header">
          <h3>{task.name}</h3>
          {isOwner || isProjectOwner ? (
            <div className="toolbar-container">
              {isOwner && (
                <Toolbar className="toolbar-svg" onClick={handleToolbarClick} />
              )}
              {dropdownVisible && (
                <div className="dropdown">
                  {isOwner && (
                    <OpenModalButton
                      buttonText="Edit"
                      modalComponent={
                        <EditTaskModal task={task} projectId={projectId} />
                      }
                      className="add-task text-name edit-button"
                    />
                  )}
                  {isOwner && (
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<TaskDeleteModal id={task.id} />}
                      className="add-task text-name delete-button"
                    />
                  )}
                </div>
              )}
            </div>
          ) : null}
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
        <div className="task-comments-section">
          <TaskComments task={task} />
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
