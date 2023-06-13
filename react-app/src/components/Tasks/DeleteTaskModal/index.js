import { useDispatch} from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteTask } from "../../../store/tasks";
import { useHistory } from "react-router-dom";
// import './index.css'

function TaskDeleteModal({ id }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();


    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteTask(id))
        .then(closeModal())
        history.push(`/user/dashboard`);
    }

    return (
        <div className="modal2">
          <h1 className="form-header">Confirm Delete</h1>
          <label>Are you sure you want to delete this Task?</label>
          <button className="delete2" onClick={handleDelete}>
            Yes (Delete Task)
          </button>
          <button className="modal-button2" onClick={closeModal}>
            No (Keep Task)
          </button>
          <form></form>
        </div>
      );
    }

export default TaskDeleteModal
