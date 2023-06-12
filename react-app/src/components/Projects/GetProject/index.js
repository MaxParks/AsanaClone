import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProjectThunk } from "../../../store/projects";
import ProjectDeleteModal from "../DeleteProjectModal";
import UpdateProjectModal from "../UpdateProjectModal";
import OpenModalButton from "../../OpenModalButton";
import ProfileButton from "../../Navigation/ProfileButton";
import { ReactComponent as Dropdown } from "../../../assets/icons/dropdown.svg";
import { useParams } from "react-router-dom";
import "./Project.css";
import "../../../index.css";
import AddTaskModal from "../../Tasks/AddTaskModal";

function formatDate(dateString) {
  const dateParts = dateString.split("-");
  return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
}

function Project({ isLoaded }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const teamData = useSelector((state) => state.teams);
  const projectData = useSelector((state) => state.projects);
  const sessionUser = useSelector((state) => state.session.user);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalButtonsVisible, setModalButtonsVisible] = useState(false);

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
          <p className="project-page-section-text">{projectData.due_date}</p>
        </div>
      </div>

      <br></br>

      <div className="tasks-list1">
        <h2>Tasks:</h2>
        <ul>
          {projectData.tasks &&
            projectData.tasks.map((task) => (
              <li key={task.id} className="task-item1">
                {task.name} ------ Assigned to: {task.assigned_to} ------ Due
                Date: {formatDate(task.due_date)}
              </li>
            ))}
        </ul>
      </div>
      {userIsOwner && (
        <div className="open-modal-button1">
          <OpenModalButton
            buttonText="Add Task"
            modalComponent={
              <AddTaskModal
                currentProjectId={id}
                currentTeamId={projectData.team_id}
              />
            }
            key={`task-${id}`}
          />
        </div>
      )}
    </div>
  );
}

export default Project;
