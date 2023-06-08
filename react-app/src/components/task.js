import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTaskById } from "../store/tasks";
import { useParams } from "react-router-dom";
// import "./Project.css";

function Task({ isLoaded }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const taskData = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskById(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Task: {taskData.name}</h1>
      <p>Project: {taskData.project_id}</p>
      <p>Due Date: {taskData.due_date}</p>
      <p>Completed :{taskData.completed}</p>
    </div>
  );
}

export default Task;
