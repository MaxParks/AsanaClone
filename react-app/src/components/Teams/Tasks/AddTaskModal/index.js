import React, { useState } from "react";
import { createTaskThunk } from "../../../../store/tasks";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTeamThunk } from "../../../../store/teams";
import { useModal } from "../../../../context/Modal";
import { useHistory } from "react-router-dom";

import "./AddTaskModal.css";

function AddTaskModal({ isLoaded }) {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard);

  const teams = Object.values(dashboardData.teams);
  const projects = Object.values(dashboardData.projects);

  console.log(dashboardData);

  const teamArray = Object.values(dashboardData.teams); // Convert the object to an array

  const projectNames = teamArray.reduce((names, team) => {
    const teamProjects = team.projects.map((project, index) => {
      if (index === 0) {
        const firstProjectName = projects[project.id]?.name; // Use optional chaining to handle undefined values
        return firstProjectName;
      }
      const projectName = projects[project.id]?.name; // Use optional chaining to handle undefined values
      return projectName;
    });
    return [...names, ...teamProjects];
  }, []);

  const uniqueProjectNames = [...new Set(projectNames)];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [project_id, setProjectId] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [assigned_to, setAssignedTo] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const fetchAssignedToUsers = async (projectId) => {
    if (projectId) {
      const selectedProject = dashboardData.projects[projectId];
      if (selectedProject) {
        const teamId = selectedProject.team_id;
        console.log(teamId);
        const teamData = await dispatch(getSingleTeamThunk(teamId));
        if (teamData) {
          const assignedToUsers = teamData.members.map((member) => ({
            id: member.id,
            name: member.username,
          }));
          setAvailableUsers(assignedToUsers);
        } else {
          setAvailableUsers([]); // Reset the available users when no project is selected
        }
      }
    } else {
      setAvailableUsers([]); // Reset the available users when no project is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!name) {
      errors.name = "Name is a required field.";
    }
    if (!project_id) {
      errors.project_id = "Project ID is a required field.";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});

    const newTask = {
      name,
      description,
      assigned_to,
      due_date,
      project_id,
    };

    dispatch(createTaskThunk(newTask));
    closeModal();
  };

  return (
    <div className="add-task-modal-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.name && <li>{errors.name}</li>}
          {errors.project_id && <li>{errors.project_id}</li>}
        </ul>
        <div className="form-field">
          <input
            type="text"
            id="name"
            placeholder="task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <textarea
            id="description"
            placeholder="task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="task-textarea"
          />
        </div>
        <div className="form-field">
          <select
            id="project"
            value={project_id}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {uniqueProjectNames.map((projectName, index) => (
              <option key={index} value={index}>
                {projectName}
              </option>
            ))}
          </select>
        </div>
        <select
          id="assignedTo"
          placeholder="Assigned to"
          value={assigned_to}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Assigned To</option>
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="form-field">
          <input
            type="date"
            id="dueDate"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="create-button">
            Add Task
          </button>
          <button type="button" className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskModal;
