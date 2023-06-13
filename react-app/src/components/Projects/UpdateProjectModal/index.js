import React, { useState, useEffect } from "react";
import { updateProjectThunk, getProjectThunk } from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
// import './UpdateProjectModal.css'

function UpdateProjectModal({ id }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [team_id, setTeamId] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const project = useSelector((state) => state.projects);
  const dashboardData = useSelector((state) => state.dashboard);
  const teams = Object.values(dashboardData.teams);

  function formatDate(dateString) {
    const dateParts = dateString.split("-");
    return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
  }

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      // setDueDate(project.due_date);
      setTeamId(project.team_id);
    }
  }, [project]);

  useEffect(() => {
    if (!project) {
      dispatch(getProjectThunk(id));
    }
  }, [dispatch, id, project]);

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

    const updatedProject = {
      name,
      description,
      due_date: dueDate,
      team_id: team_id,
    };

    const data = await dispatch(updateProjectThunk(id, updatedProject));

    if (Array.isArray(data)) {
      setErrors({ general: data });
    } else if (data && data.id) {
      dispatch(getProjectThunk(id));
      closeModal();
      history.push(`/projects/${id}`);
    } else {
      closeModal();
    }
  };

  return (
    <div className="add-task-modal-container">
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.name && <li>{errors.name}</li>}
          {errors.team_id && <li>{errors.team_id}</li>}
          {errors.description && <li>{errors.description}</li>}
          {errors.dueDate && <li>{errors.dueDate}</li>}
          {errors.general &&
            errors.general.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-field">
          <input
            type="text"
            className="create-project-input"
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
            className="create-project-input"
            id="description"
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <input
            type="date"
            className="create-project-input"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="create-button">
            Update
          </button>
          <button type="button" className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProjectModal;
