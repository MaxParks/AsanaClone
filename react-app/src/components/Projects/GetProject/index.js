import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProjectThunk } from "../../../store/projects";
import ProjectDeleteModal from "../DeleteProjectModal";
import OpenModalButton from "../../OpenModalButton";
import { useParams } from "react-router-dom";
import "./Project.css";

function Project({ isLoaded }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const projectData = useSelector((state) => state.projects);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getProjectThunk(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Project: {projectData.name}</h1>
      <p>Description: {projectData.description}</p>
      <p>Due Date: {projectData.due_date}</p>
      <h2>Tasks:</h2>
      <ul>
        {projectData.tasks &&
          projectData.tasks.map((task) => (
            <li key={task.id}>
              {task.name} - Assigned to: {task.assigned_to} - Due Date:{" "}
              {task.due_date}
            </li>
          ))}
      </ul>
      <OpenModalButton
        buttonText="Delete"
        modalComponent={<ProjectDeleteModal id={id} />}
        key={`delete-${id}`}
      />
    </div>
  );
}

export default Project;
