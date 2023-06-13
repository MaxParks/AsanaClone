import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteProject } from "../../../store/projects";
import { useHistory } from "react-router-dom";

function ProjectDeleteModal({ id }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(deleteProject(id)).then(closeModal());
    history.push(`/user/dashboard`);
  };

  return (
    <div className="add-task-modal-container">
      <h1 className="form-header">Confirm Delete</h1>
      <p style={{ marginBottom: "15px" }}>
        Are you sure you want to delete this Project?
      </p>
      <div className="button-container">
        <button className="delete-button" onClick={handleDelete}>
          Yes (Delete Project)
        </button>
        <button className="modal-button2" onClick={closeModal}>
          No (Keep Project)
        </button>
      </div>
    </div>
  );
}

export default ProjectDeleteModal;
