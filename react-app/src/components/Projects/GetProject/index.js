import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProjectThunk } from "../../../store/projects";
import { updateSingleTask } from "../../../store/tasks";
import OpenModalButton from "../../OpenModalButton";
import ProjectDeleteModal from "../DeleteProjectModal";
import UpdateProjectModal from "../UpdateProjectModal";
import TaskModal from "../../Tasks/TaskModal";
import AddTaskModal from "../../Tasks/AddTaskModal";
import ProfileButton from "../../Navigation/ProfileButton";
import { ReactComponent as Dropdown } from "../../../assets/icons/dropdown.svg";
import { ReactComponent as Plus } from "../../../assets/icons/plus.svg";
import { ReactComponent as Checkmark } from "../../../assets/icons/checkmark.svg";

import { useParams } from "react-router-dom";

import { formatDueDate } from "../../../utils";
import "./Project.css";
import "../../../index.css";

// function formatDate(dateString) {
//   const dateParts = dateString.split("-");
//   return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
// }

function Project({ isLoaded }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const teamData = useSelector((state) => state.teams);
  const projectData = useSelector((state) => state.projects);
  const sessionUser = useSelector((state) => state.session.user);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalButtonsVisible, setModalButtonsVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false) 

  const userIsOwner =
    sessionUser.id === projectData.owner_id ||
    sessionUser.id === teamData.owner_id;

  useEffect(() => {
    // Fetch project data when component mounts
    dispatch(getProjectThunk(id));
  }, [dispatch, id]);

  function toggleDropdown() {
    setDropdownVisible(!dropdownVisible);
    setModalButtonsVisible(true); // Hide modal buttons when dropdown is toggled
  }

  const toggleTaskCompletion = async (
    taskId,
    projectData,
    dispatch,
    updateSingleTask
  ) => {
    const task = Object.values(projectData.tasks).find(
      (task) => task.id === taskId
    );
    console.log(task);

    if (task) {
      const updatedTask = {
        name: task.name,
        description: task.description,
        assigned_to: task.assigned_to,
        due_date: task.due_date,
        completed: task.completed ? false : true,
        project_id: projectData.id,
      };

      console.log(updatedTask);

      dispatch(updateSingleTask(taskId, updatedTask));
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const dropdownContent = document.querySelector(".dropdown-content");
      if (dropdownContent && !dropdownContent.contains(event.target)) {
        setModalButtonsVisible(false);
      }
    }

    if (dropdownVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownVisible]);

  const closeTaskModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="project-page-container">
      <div className="project-header-container">
        <div className="title-dropdown-container">
          <h3>{projectData.name}</h3>
          {userIsOwner && (
            <Dropdown onClick={toggleDropdown} className="dropdown-toggle" />
          )}
          {dropdownVisible && (
            <div className="dropdown-container">
              {modalButtonsVisible && userIsOwner && (
                <ul className="dropdown-content">
                  <li>
                    <OpenModalButton
                      buttonText="Update"
                      modalComponent={<UpdateProjectModal id={id} />}
                      key={`update-${id}`}
                      className="project"
                    />
                  </li>
                  <li>
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<ProjectDeleteModal id={id} />}
                      key={`delete-${id}`}
                      className="project"
                    />
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
        <ProfileButton user={sessionUser} />
      </div>

      <div className="project-page-info">
        <div>
          <p className="project-page-section-title">Project Description:</p>
          <p className="project-page-section-text">{projectData.description}</p>
        </div>
        <br></br>
        <div>
          <p className="project-page-section-title">Due Date:</p>
          <p className="project-page-section-text">
            {formatDueDate(projectData.due_date)}
          </p>
        </div>
      </div>

      <br></br>

      <div className="project-page-task-section">
        <div className="project-page-add-task">
          <Plus className="project-page-plus-svg" />
          <OpenModalButton
            buttonText="Add Task"
            modalComponent={<AddTaskModal />}
            className="task"
          />
        </div>
        <ul className="project-page-task-list">
          {projectData.tasks &&
            projectData.tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div
                  className={`checkmark ${task.completed ? "green" : ""}`}
                  onClick={() =>
                    toggleTaskCompletion(
                      task.id,
                      projectData,
                      dispatch,
                      updateSingleTask
                    )
                  }
                >
                  <Checkmark />
                </div>
                <div className="task-link">
                  <OpenModalButton
                    buttonText={task.name}
                    modalComponent={
                      <TaskModal task={task} closeModal={closeTaskModal} />
                    }
                    className="task-name"
                  />
                  <span className="task-due-date">
                    {formatDueDate(task.due_date)}
                  </span>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Project;
