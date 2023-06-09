import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleTaskComment } from "../../store/tasks";

import "../Tasks/TaskModal/TaskModal.css";

function TaskComments(props) {
  const { taskId } = props;
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.tasks);

  const comments = taskData[taskId]?.comments;

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id} className="task-comment-wrapper">
            <div className="task-comment">
              <div className="task-assigned-to-icon">
                <p className="user-icon">
                  {comment.user.first_name.charAt(0)}
                  {comment.user.last_name.charAt(0)}
                </p>
                <p className="task-comment-name">{comment.user.first_name} </p>
              </div>
              <p className="task-comment-description">{comment.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskComments;
