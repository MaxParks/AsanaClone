import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDashboardThunk } from "../../store/dashboard";
import { fetchTaskById } from "../../store/tasks";
import { updateSingleTask } from "../../store/tasks";
import { toggleTaskCompletion, formatDueDate } from "../../utils";
import ProfileButton from "../Navigation/ProfileButton";
import OpenModalButton from "../OpenModalButton";
import CreateProjectModal from "../Projects/AddProjectModal";
import AddTaskModal from "../Tasks/AddTaskModal";
import TaskModal from "../Tasks/TaskModal";

import { ReactComponent as Checkmark } from "../../assets/icons/checkmark.svg";
import { ReactComponent as ProjectIcon } from "../../assets/icons/project-icon.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";

import "./Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const dashboardData = useSelector((state) => state.dashboard);
  const [selectedTask, setSelectedTask] = useState(null); // Add a state to track the selected task

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

  // Function to handle closing the task modal
  const closeTaskModal = () => {
    setSelectedTask(null);
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
            <div className="task-item add-item">
              <div>
                <Checkmark />
              </div>
              <div className="task-link">
                <OpenModalButton
                  buttonText="Click here to add a new task..."
                  modalComponent={<AddTaskModal />}
                  className="add-task text-name"
                />
              </div>
            </div>
          </div>
          <div className="task-list">
            {dashboardData.assigned_tasks &&
              Object.values(dashboardData.assigned_tasks).map((task) => (
                <div key={task.id} className="task-item">
                  <div
                    className={`checkmark ${task.completed ? "green" : ""}`}
                    onClick={() =>
                      toggleTaskCompletion(
                        task.id,
                        dashboardData.assigned_tasks,
                        dispatch,
                        updateSingleTask
                      )
                    }
                  >
                    <Checkmark />
                  </div>
                  <div className="task-link">
                    <OpenModalButton
                      buttonText={task.name}
                      modalComponent={
                        <TaskModal task={task} closeModal={closeTaskModal} />
                      }
                      className="task-name"
                    />
                    <span className="task-due-date">
                      {formatDueDate(task.due_date)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="split-container">
          <div className="section-title-container">
            <h2 className="section-title">Projects:</h2>
          </div>
          <div className="project-list">
            <div className="create-project-button">
              <OpenModalButton
                buttonText="+"
                modalComponent={<CreateProjectModal />}
                className="create-project"
              />
              <OpenModalButton
                buttonText="Create a Project"
                modalComponent={<CreateProjectModal />}
                className="create-project-text"
              />
            </div>
            {dashboardData.projects &&
              Object.values(dashboardData.projects).map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  className="project-item"
                >
                  <div className="project-icon-wrapper">
                    <ProjectIcon className="project-svg-icon" />
                  </div>
                  {project.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
