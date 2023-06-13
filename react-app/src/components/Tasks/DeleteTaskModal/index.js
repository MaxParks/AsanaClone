import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteTask } from "../../../store/tasks";
import { useHistory } from "react-router-dom";

function TaskDeleteModal({ id }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(deleteTask(id)).then(closeModal());
    history.push(`/user/dashboard`);
  };

  return (
    <div className="add-task-modal-container">
      <h1 className="form-header">Confirm Delete</h1>
      <p style={{ marginBottom: "15px" }}>
        Are you sure you want to delete this Task?
      </p>
      <div className="button-container">
        <button
          className="cancel-button"
          style={{ backgroundColor: "darkred" }}
          onClick={handleDelete}
        >
          Yes (Delete Task)
        </button>
        <button className="cancel-button" onClick={closeModal}>
          No (Keep Task)
        </button>
      </div>
    </div>
  );
}

export default TaskDeleteModal;
