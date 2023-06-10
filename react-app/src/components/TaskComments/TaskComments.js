import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleTaskComment, fetchTaskById } from "../../store/tasks";

import "../Teams/Tasks/TaskModal/TaskModal.css";

function TaskComments(props) {
  const { taskId } = props;
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.tasks);

  const comments = taskData[taskId]?.comments;

  const [commentText, setCommentText] = useState("");
  const [hoveredCommentId, setHoveredCommentId] = useState(null);

  const reversedComments = comments ? [...comments].reverse() : [];

  const handleMouseEnter = (commentId) => {
    setHoveredCommentId(commentId);
  };

  const handleMouseLeave = () => {
    setHoveredCommentId(null);
  };

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = () => {
    if (commentText) {
      dispatch(addSingleTaskComment(taskId, commentText))
        .then(() => {
          setCommentText(""); // Clear the comment text after adding
          dispatch(fetchTaskById(taskId)); // Fetch the updated task
        })
        .catch((error) => {
          console.log("Error adding comment:", error);
        });
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
                <p className="user-icon">
                  {comment.user.first_name.charAt(0)}
                  {comment.user.last_name.charAt(0)}
                </p>
                <div className="task-comment-text">
                  <p className="task-comment-name">
                    {comment.user.first_name}{" "}
                  </p>
                  <p className="task-comment-description">{comment.comment}</p>
                </div>
                {comment.user.owner_id === comment.user.id &&
                hoveredCommentId === comment.id ? (
                  <button className="delete-comment-button">X</button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskComments;
