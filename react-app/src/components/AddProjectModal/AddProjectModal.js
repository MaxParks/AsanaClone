import React, { useState } from "react";
import { createProjectThunk } from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
// import 'AddProjectModal.css';

function CreateProjectModal() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [team_id, setTeamId] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("------------------", 1);
    const validationErrors = [];
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("------------------", 2);

      const data = await dispatch(
        createProjectThunk(name, description, dueDate, team_id)
      );
      console.log("------------------", 4);
      if (data && data.errors) {
        setErrors(data.errors.map((error) => error.msg));
      } else if (data && data.id) {
        closeModal();
        history.push("/user/dashboard");
      }
      closeModal();
    }
  };

  return (
    <div className="create-project-modal-container">
      <h2>Create New Project</h2>
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
