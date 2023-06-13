import React, { useState, useEffect } from "react";
import { createTaskThunk } from "../../../store/tasks";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTeamThunk } from "../../../store/teams";
import { getProjectsThunk } from "../../../store/projects";
import { getDashboardThunk } from "../../../store/dashboard";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

import "./AddTaskModal.css";

function AddTaskModal({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const dashboardData = useSelector((state) => state.dashboard);
  const projects = useSelector((state) => state.projects);
  const teamsData = useSelector((state) => state.teams);

  const teams = Object.values(dashboardData.teams);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [teamId, setTeamId] = useState(""); // Default to currentTeamId
  const [teamMembers, setTeamMembers] = useState([]);
  const [project_id, setProjectId] = useState(""); // Default to currentProjectId
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [assigned_to, setAssignedTo] = useState("");
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();

  const handleTeamChange = async (teamId) => {
    setTeamId(teamId);
    console.log(teamsData[teamId]);
    setFilteredProjects(teamsData[teamId].projects || []);
    setTeamMembers(teamsData[teamId].members);
  };

  useEffect(() => {
    if (teamMembers && teamMembers.length > 0) {
      const memberData = teamMembers.map(function (member) {
        return {
          id: member.id,
          firstName: member.name.split(" ")[0], // Extract the first name
        };
      });

      setAvailableUsers(memberData);
    } else {
      setAvailableUsers([]);
    }
  }, [teamId]);

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
            id="team"
            value={teamId}
            onChange={(e) => handleTeamChange(e.target.value)}
          >
            <option value="">Select Team</option>
            {Object.keys(teamsData).map((teamId) => {
              const teamObject = teamsData[teamId];
              return (
                <option key={teamObject.id} value={teamObject.id}>
                  {teamObject.name}
                </option>
              );
            })}
            ;
          </select>
        </div>
        <select
          id="project"
          value={project_id}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Select Project</option>
          {filteredProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <select
          id="assignedTo"
          placeholder="Assigned to"
          value={assigned_to}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Assigned To</option>
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName}
            </option>
          ))}
        </select>

        <div className="form-field">
          <input
            type="date"
            id="dueDate"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
            required
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
