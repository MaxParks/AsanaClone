import React, { useState } from "react";
import { createTaskThunk } from "../../../store/tasks";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

function AddTaskModal({ projectId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assigned_to, setAssignedTo] = useState("");
  const [due_date, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [project_id, setProjectId] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      createTaskThunk(
        name,
        description,
        assigned_to,
        due_date,
        completed,
        project_id
      )
    );

    if (data && data.id) {
      closeModal();
      history.push("/user/dashboard/");
    } else if (data) {
      setErrors(data);
    } else {
      closeModal();
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
          <label htmlFor="completed">Completed</label>
          <input
            type="boolean"
            id="completed"
            placeholder="Completed"
            value={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Project Id</label>
          <input
            type="number"
            id="projectId"
            placeholder="Project Id"
            value={project_id}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="assignedTo">Assigned To</label>
          <input
            type="text"
            id="assignedTo"
            placeholder="Assigned to"
            value={assigned_to}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="dueDate">Due Date</label>
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
