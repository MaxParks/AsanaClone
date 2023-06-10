import React, { useState } from "react";
import { createProjectThunk } from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

function CreateProjectModal(isLoaded) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [team_id, setTeamId] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();

  const dashboardData = useSelector((state) => state.dashboard);
  const teams = Object.values(dashboardData.teams);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!name) {
      errors.name = "Name is a required field.";
    }
    if (!team_id) {
      errors.team_id = "Team is a required field.";
    }
    if (!description) {
      errors.description = "Description is a required field.";
    }
    if (!dueDate) {
      errors.dueDate = "Due Date is a required field.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});

    const data = await dispatch(
      createProjectThunk(name, description, dueDate, team_id)
    );
    if (Array.isArray(data)) {
      setErrors({ general: data });
    } else if (data && data.id) {
      closeModal();
      history.push(`/projects/${data.id}`);
    } else {
      closeModal();
    }
  };

  return (
    <div className="add-task-modal-container">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.name && <li>{errors.name}</li>}
          {errors.team_id && <li>{errors.team_id}</li>}
          {errors.description && <li>{errors.description}</li>}
          {errors.dueDate && <li>{errors.dueDate}</li>}
          {errors.general && errors.general.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-field">
          <input
            type="text"
            id="name"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <select
            id="team_id"
            value={team_id}
            onChange={(e) => setTeamId(e.target.value)}
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
          <input
            type="text"
            id="description"
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="create-button">
            Create
          </button>
          <button type="button" className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProjectModal;
