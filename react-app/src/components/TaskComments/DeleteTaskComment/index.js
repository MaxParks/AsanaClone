import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import { deleteTaskComment } from "../../../store/tasks";

import "./DeleteTaskComment.css";

function DeleteCommentModal(props) {
  const { taskId, commentId } = props;
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleDelete = () => {
    // Implement your delete logic here using the commentId
    console.log("Deleting comment with ID:", commentId);
    dispatch(deleteTaskComment(taskId, commentId));
    closeModal();
  };

  return (
    <div className="delete-comment-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this comment?</p>
      <div className="delete-comment-buttons">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
