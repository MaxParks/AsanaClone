import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteProject} from "../../store/projects";
import { useHistory } from "react-router-dom";
import './index.css'

function ProjectDeleteModal({ id }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();


    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteProject(id))
        .then(closeModal())
        history.push(`/user/dashboard`);
    }

    return (
        <div className="modal2">
          <h1 className="form-header">Confirm Delete</h1>
          <label>Are you sure you want to delete this Project?</label>
          <button className="delete2" onClick={handleDelete}>
            Yes (Delete Project)
          </button>
          <button className="modal-button2" onClick={closeModal}>
            No (Keep Project)
          </button>
          <form></form>
        </div>
      );
    }

export default ProjectDeleteModal
