import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardThunk } from "../store/dashboard";

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
    <div className="page-container">
      <div className="dashboard-header">
        <h2 className="dashboard-date">
          {currentDate.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <h2 className="dashboard-greeting">
          {`${greetingMessage}, ${sessionUser.firstName}`}
        </h2>
      </div>

      <div className="dashboard-content">
        <div className="tasks-container">
          <h2 className="section-title">My Tasks</h2>
          <div className="task-list">
            {dashboardData.assigned_tasks &&
              Object.values(dashboardData.assigned_tasks).map((task) => (
                <div className="task-item" key={task.id}>
                  {task.name}
                </div>
              ))}
          </div>
        </div>

        <div className="projects-container">
          <h2 className="section-title">Projects</h2>
          <div className="project-list">
            {dashboardData.projects &&
              Object.values(dashboardData.projects).map((project) => (
                <div className="project-item" key={project.id}>
                  {project.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
