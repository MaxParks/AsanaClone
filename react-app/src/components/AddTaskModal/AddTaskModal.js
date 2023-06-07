import React, { useState } from 'react';
import { createTask } from '../../store/tasks';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';

function AddTaskModal({ projectId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      createTask(name, description, assignedTo, dueDate, false, projectId)
    );
    if (data && data.errors) {
      setErrors(data.errors.map((error) => error.msg));
    } else if (data && data.id) {
      closeModal();
      history.push(`/projects/${projectId}`);
    }
  };

  return (
    <div className="add-task-modal-container">
      <h2>Add New Task</h2>
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
            placeholder="Task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="assignedTo">Assigned To</label>
          <input
            type="text"
            id="assignedTo"
            placeholder="Assigned to"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
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
