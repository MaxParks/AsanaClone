import React, { useState, useEffect } from "react";
import { updateProjectThunk, getProjectThunk } from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import './UpdateProjectModal.css'

function UpdateProjectModal({ id }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [team_id, setTeamId] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const project = useSelector(state => state.projects[id]);
  console.log("Project from redux: ", project);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setDueDate(project.due_date);
      setTeamId(project.team_id);
    }
  }, [project]);

  useEffect(() => {
    if(!project){
      dispatch(getProjectThunk(id));
    }
  }, [dispatch, id, project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      name,
      description,
      due_date: dueDate,
      team_id: team_id,
    };

    const data = await dispatch(updateProjectThunk(id, updatedProject));

    if (Array.isArray(data)) {
      setErrors(data);
      console.log("VALIDATION ERRORS --->", errors);
    } else if (data && data.id) {
      dispatch(getProjectThunk(id));
      closeModal();
      history.push(`/projects/${id}`);
    } else {
      closeModal();
    }
  };

  return (
    <div className="update-project-modal-container">
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="team_id">Team</label>
          <input
            type="number"
            id="team_id"
            placeholder="Team"
            value={team_id}
            onChange={(e) => setTeamId(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="update-button">
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
