import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDashboardThunk } from "../../store/dashboard";
import { updateSingleTask } from "../../store/tasks";
import ProfileButton from "../Navigation/ProfileButton";
import OpenModalButton from "../OpenModalButton";
import CreateProjectModal from "../Projects/AddProjectModal";
import AddTaskModal from "../Tasks/AddTaskModal";
import "./Dashboard.css";
import { ReactComponent as Checkmark } from "../../assets/icons/checkmark.svg";

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

  const toggleTaskCompletion = async (taskId) => {
    const task = Object.values(dashboardData.assigned_tasks).find(
      (task) => task.id === taskId
    );

    if (task) {
      const updatedTask = {
        name: task.name,
        description: task.description,
        assigned_to: task.assigned_to,
        due_date: task.due_date,
        completed: task.completed ? false : true,
        project_id: task.project_id,
      };

      dispatch(updateSingleTask(taskId, updatedTask));
    }
  };

  return (
    <div
      className="page-container"
      style={{ backgroundColor: "var(--color-charcoal)" }}
    >
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
        <div className="split-container">
          <div className="section-title-container">
            <h2 className="section-title">My Tasks</h2>
          </div>
          <div className="add-task-container">
            <Checkmark />
            <OpenModalButton
              buttonText="Add New Task"
              modalComponent={<AddTaskModal />}
              className="add-task"
            />
          </div>
          <div className="task-list">
            {dashboardData.assigned_tasks &&
              Object.values(dashboardData.assigned_tasks).map((task) => (
                <div key={task.id} className="task-item">
                  <span
                    className={`checkmark ${task.completed ? "green" : ""}`}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    <Checkmark />
                  </span>
                  <Link to={`/tasks/${task.id}`} className="task-link">
                    <span className="task-name">{task.name}</span>
                    <span className="due-date">{task.due_date}</span>
                  </Link>
                </div>
              ))}
          </div>
        </div>

        <div className="split-container">
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
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="project-item"
                  >
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
