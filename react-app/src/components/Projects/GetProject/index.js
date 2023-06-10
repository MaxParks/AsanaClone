import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProjectThunk } from "../../../store/projects";
import ProjectDeleteModal from "../DeleteProjectModal";
import UpdateProjectModal from "../UpdateProjectModal";
import OpenModalButton from "../../OpenModalButton";
import ProfileButton from "../../Navigation/ProfileButton";
import { useParams } from "react-router-dom";
import "./Project.css";
import AddTaskModal from "../../Teams/Tasks/AddTaskModal";

function Project({ isLoaded }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const teamData = useSelector((state) => state.teams);
  const projectData = useSelector((state) => state.projects);
  const sessionUser = useSelector((state) => state.session.user);


const userIsOwner = sessionUser.id === projectData.owner_id || sessionUser.id === teamData.owner_id;


  useEffect(() => {
    // Fetch project data when component mounts
    dispatch(getProjectThunk(id));
  }, [dispatch, id]);


  return (
    <div className="page-container1">
      <div className="header-container1">
        <h1 className="header-title1">{projectData.name}</h1>
        <ProfileButton user={sessionUser} />
        <p className="due-date1">Due Date: {projectData.due_date}</p>
      </div>
      <p className="project-description1">Project Description:</p>
      <br></br>
       <p>{projectData.description}</p>
       <br></br>
       {userIsOwner && (
        <div className="open-modal-button1">
          <OpenModalButton
            buttonText="Add Task"
            modalComponent={<AddTaskModal />}
            key={`task-${id}`}
          />
        </div>
      )}
      <div className="tasks-list1">
        <h2>Tasks:</h2>
        <ul>
          {projectData.tasks &&
            projectData.tasks.map((task) => (
              <li key={task.id} className="task-item1">
                {task.name} - Assigned to: {task.assigned_to} - Due Date: {task.due_date}
              </li>
            ))}
        </ul>
      </div>
      {userIsOwner && (
        <div className="open-modal-button1">
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<ProjectDeleteModal id={id} />}
            key={`delete-${id}`}
          />
          <OpenModalButton
            buttonText="Update"
            modalComponent={<UpdateProjectModal id={id} />}
            key={`update-${id}`}
          />
        </div>
      )}
    </div>
  );
}

export default Project;
