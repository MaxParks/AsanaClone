import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSingleTaskComment,
  fetchTaskById,
  deleteTaskComment,
} from "../../store/tasks";

import "../Tasks/TaskModal/TaskModal.css";

function TaskComments(props) {
  const { taskId } = props;
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.tasks);

  const comments = taskData[taskId]?.comments;

  const [commentText, setCommentText] = useState("");
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [deleteDropdownId, setDeleteDropdownId] = useState(null);

  const reversedComments = comments ? [...comments].reverse() : [];

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHoveredCommentId(null);
        setDeleteDropdownId(null);
      }
    };

    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  const handleMouseEnter = (commentId) => {
    console.log(commentId);
    setHoveredCommentId(commentId);
  };

  const handleMouseLeave = () => {
    setHoveredCommentId(null);
    setDeleteDropdownId(null);
  };

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = () => {
    if (commentText) {
      dispatch(addSingleTaskComment(taskId, commentText))
        .then(() => {
          setCommentText("");
          dispatch(fetchTaskById(taskId));
        })
        .catch((error) => {
          console.log("Error adding comment:", error);
        });
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteTaskComment(taskId, commentId))
      .then(() => {
        dispatch(fetchTaskById(taskId));
        setDeleteDropdownId(null);
      })
      .catch((error) => {
        console.log("Error deleting comment:", error);
      });
  };

  const handleToggleDeleteDropdown = (commentId) => {
    if (deleteDropdownId === commentId) {
      setDeleteDropdownId(null);
    } else {
      setDeleteDropdownId(commentId);
    }
  };

  return (
    <div>
      <div className="add-comment-section">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={handleCommentTextChange}
          className="add-task-comment-input"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      {reversedComments &&
        reversedComments.map((comment) => (
          <div
            key={comment.id}
            className="task-comment-wrapper"
            onMouseEnter={() => handleMouseEnter(comment.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="task-comment">
              <div className="task-assigned-to-icon">
                <div className="task-comment-content">
                  <p className="user-icon">
                    {comment.user.first_name.charAt(0)}
                    {comment.user.last_name.charAt(0)}
                  </p>
                  <div className="task-comment-text">
                    <p className="task-comment-name">
                      {comment.user.first_name}{" "}
                    </p>
                    <p className="task-comment-description">
                      {comment.comment}
                    </p>
                  </div>
                </div>
                {comment.user.owner_id === comment.user.id && (
                  <div className="task-dropdown-container" ref={dropdownRef}>
                    {(hoveredCommentId === comment.id ||
                      deleteDropdownId === comment.id) && (
                      <>
                        <button
                          className="delete-comment-hover"
                          onClick={() => handleToggleDeleteDropdown(comment.id)}
                        >
                          X
                        </button>
                        {deleteDropdownId === comment.id && (
                          <div className="delete-comment-dropdown">
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="delete-button"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskComments;
