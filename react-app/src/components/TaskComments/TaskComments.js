import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleTaskComment } from "../../store/tasks";

import "../Tasks/TaskModal/TaskModal.css";

function TaskComments(props) {
  const { taskId } = props;
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.tasks);

  const comments = taskData[taskId]?.comments;

  const [hoveredCommentId, setHoveredCommentId] = useState(null);

  const handleMouseEnter = (commentId) => {
    setHoveredCommentId(commentId);
  };

  const handleMouseLeave = () => {
    setHoveredCommentId(null);
  };

  return (
    <div>
      <div className="add-comment-section">
        <input type="text" placeholder="Add a comment..." />
        <button>Add Comment</button>
      </div>
      {comments &&
        comments.map((comment) => (
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
