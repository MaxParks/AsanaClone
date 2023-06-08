import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDashboardThunk } from "../store/dashboard";
import ProfileButton from "./Navigation/ProfileButton";
import OpenModalButton from "./OpenModalButton";
import CreateProjectModal from "./AddProjectModal/AddProjectModal";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import "./Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const dashboardData = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardThunk());
  }, [dispatch]);

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let greetingMessage = "Good evening";
  if (currentHour < 12) {
    greetingMessage = "Good morning";
  } else if (currentHour < 18) {
    greetingMessage = "Good afternoon";
  }


  return (
    <div className="page-container" style={{ backgroundColor: "var(--color-charcoal)" }}>
      <div className="header-container">
        <h1 className="header-title">Home</h1>
        <ProfileButton user={sessionUser} />
      </div>

      <div className="dashboard-header">
        <h2 className="dashboard-date">
          {currentDate.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <h3 className="dashboard-greeting">
          {`${greetingMessage}, ${sessionUser.firstName}`}
        </h3>
      </div>

      <div className="dashboard-content">
        <div className="tasks-container">
          <div className="section-title-container">
            <h2 className="section-title">My Tasks</h2>
            <div className="create-task-button">
              <OpenModalButton
                buttonText="Add New Task"
                modalComponent={<AddTaskModal />}
                className="button-AddTaskModal"
              />
            </div>
          </div>
          <div className="task-list">
            {dashboardData.assigned_tasks &&
              Object.values(dashboardData.assigned_tasks).map((task) => (
                <Link to={`/tasks/${task.id}`} key={task.id} className="task-item">
                  {task.isComplete ? (
                    <span className="check-mark">&#x2713;</span>
                  ) : (
                    <span className="check-mark">&#x2717;</span>
                  )}
                  <span className="task-name">{task.name}</span>
                  <span className="due-date">{task.due_date}</span>
                </Link>
              ))}
          </div>
        </div>

        <div className="projects-container">
          <div className="section-title-container">
            <h2 className="section-title">Projects</h2>
            <div className="create-project-button">
              <OpenModalButton
                buttonText="Add New Project"
                modalComponent={<CreateProjectModal />}
                className="button-CreateProjectModal"
              />
            </div>
            <div className="project-list">
              {dashboardData.projects &&
                Object.values(dashboardData.projects).map((project) => (
                  <Link to={`/projects/${project.id}`} key={project.id} className="project-item">
                    {project.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
