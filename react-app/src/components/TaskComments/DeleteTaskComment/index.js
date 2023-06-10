import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteTaskComment } from "../../../store/tasks";

function DeleteCommentModal(props) {
  const { taskId, commentId, onClose } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Implement your delete logic here using the commentId
    console.log("Deleting comment with ID:", commentId);
    dispatch(deleteTaskComment(taskId, commentId));
    onClose();
  };

  const handleCancel = () => {
    // Close the modal without deleting
    onClose();
  };

  return (
    <div className="delete-comment-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this comment?</p>
      <div className="modal-buttons">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
