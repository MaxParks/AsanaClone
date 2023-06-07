import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfileButton from "./Navigation/ProfileButton";
import { getDashboardThunk } from "../store/dashboard";

import "./Navigation/Navigation.css";

function Dashboard({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const dashboardData = useSelector((state) => state.dashboard.dashboard);

  useEffect(() => {
    dispatch(getDashboardThunk());
  }, [dispatch]);

  // Fake data for tasks and projects
  const tasks = [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
    { id: 3, name: "Task 3" },
  ];

  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
  ];

  const currentDate = new Date();
  const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);

  const getGreetingMessage = () => {
    const currentHour = currentDate.getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
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

      <div
        className="dashboard-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <div
          className="dashboard-header"
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 className="dashboard-date" style={{ fontSize: "20px" }}>
            {formattedDate}
          </h2>
          <h3 className="dashboard-greeting" style={{ fontSize: "1.5rem" }}>
            {`${getGreetingMessage()}, ${sessionUser.firstName}`}
          </h3>
        </div>

        <div
          className="dashboard-content"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="tasks-container"
            style={{
              backgroundColor: "grey",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginRight: "20px",
              width: "80%",
              borderRadius: "8px",
            }}
          >
            <h2 className="section-title" style={{ marginTop: "0" }}>
              My Tasks
            </h2>
            <div className="task-list" style={{ marginTop: "10px" }}>
              {tasks.map((task) => (
                <div
                  className="task-item"
                  key={task.id}
                  style={{
                    padding: "5px",
                    marginBottom: "5px",
                    color: 'white',
                    borderRadius: "4px",
                  }}
                >
                  {task.name}
                </div>
              ))}
            </div>
          </div>

          <div
            className="projects-container"
            style={{
              backgroundColor: "grey",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginLeft: "20px",
              width: "80%",
              borderRadius: "8px",
            }}
          >
            <h2 className="section-title" style={{ marginTop: "0" }}>
              Projects
            </h2>
            <div className="project-list" style={{ marginTop: "10px" }}>
              {projects.map((project) => (
                <div
                  className="project-item"
                  key={project.id}
                  style={{
                    padding: "5px",
                    marginBottom: "5px",
                    color: 'white',
                    borderRadius: "4px",
                  }}
                >
                  {project.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
