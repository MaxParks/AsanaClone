import React, { useState, useEffect } from "react";
import { createTaskThunk } from "../../../store/tasks";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTeamThunk } from "../../../store/teams";
import { getProjectsThunk } from "../../../store/projects";
import { getDashboardThunk } from "../../../store/dashboard";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

import "./AddTaskModal.css";

function AddTaskModal({ isLoaded, currentProjectId = "", currentTeamId = "" }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const dashboardData = useSelector((state) => state.dashboard);
  const projects = useSelector((state) => state.projects);
  const teamsData = useSelector((state) => state.teams.selectedTeam);

  const teams = Object.values(dashboardData.teams);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [teamId, setTeamId] = useState(currentTeamId); // Default to currentTeamId
  const [teamMembers, setTeamMembers] = useState([]);
  const [project_id, setProjectId] = useState(currentProjectId); // Default to currentProjectId
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [assigned_to, setAssignedTo] = useState("");
  const [errors, setErrors] = useState([]);

  const { closeModal } = useModal();

  const handleTeamChange = async (teamId) => {
    try {
      setTeamId(teamId);
      let selectedTeam = null;
      for (let i = 0; i < teams.length; i++) {
        if (teams[i].id === parseInt(teamId, 10)) {
          selectedTeam = teams[i];
          break;
        }
      }

      if (selectedTeam) {
        setFilteredProjects(selectedTeam.projects);
        // Retrieve team members for the selected team
        await dispatch(getSingleTeamThunk(teamId));
      } else {
        setFilteredProjects([]);
        setAvailableUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (teamsData && teamsData.members && teamsData.members.length > 0) {
      const memberData = teamsData.members.map(function (member) {
        return {
          id: member.id,
          name: member.firstName + " " + member.lastName,
        };
      });

      setAvailableUsers(memberData);
    } else {
      setAvailableUsers([]);
    }
  }, [teamsData]);

  useEffect(() => {
    handleTeamChange(teamId);
  }, [teamId, currentTeamId]);

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
            className="add-task-input"
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
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
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
        </div>
        <div className="form-field">
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
        </div>

        <div className="form-field">
          <input
            type="date"
            className="add-task-input"
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
