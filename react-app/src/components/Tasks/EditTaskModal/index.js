import React, { useState, useEffect } from "react";
import { fetchTaskById, updateSingleTask } from "../../../store/tasks";
import { getProjectThunk } from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import "../AddTaskModal/AddTaskModal.css";

function EditTaskModal({ task, projectId }) {
  const { assigned_to, completed } = task;

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const taskData = useSelector((state) => state.tasks);
  const projectData = useSelector((state) => state.projects);

  const [project_id, setProjectId] = useState(projectData.id);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTaskById(task.id));
      await dispatch(getProjectThunk(projectId));
    };

    fetchData();
  }, [dispatch, task.id, projectId]);

  const [name, setName] = useState(taskData[task.id].name);
  const [description, setDescription] = useState(taskData[task.id].description);
  const [due_date, setDueDate] = useState(
    new Date(taskData[task.id].due_date).toLocaleDateString("en-CA")
  );

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
      id: task.id,
      name,
      description,
      assigned_to,
      due_date,
      completed,
      project_id,
    };

    try {
      await dispatch(updateSingleTask(task.id, newTask));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-task-modal-container">
      <h2>Edit task for '{projectData.name}'</h2>
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
          <input
            type="date"
            className="add-task-input"
            id="dueDate"
            value={due_date}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="create-button">
            Update Task
          </button>
          <button type="button" className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskModal;
