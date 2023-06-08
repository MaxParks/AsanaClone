import React, { useState } from 'react';
import { createProjectThunk } from '../../store/projects';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';
// import 'AddProjectModal.css';

function CreateProjectModal( isLoaded ) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [team_id, setTeamId] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(createProjectThunk(name, description, dueDate, team_id));
    if (data) {
      console.log('DATA ---->', data)
      setErrors(data)
      console.log('VALIDATION ERRORS --->', errors)
    } else if (data && data.id) {
      closeModal();
      history.push('/user/dashboard');
    } else {
    closeModal()
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
