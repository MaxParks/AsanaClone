import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../store/dashboard';
import { fetchProjects } from '../store/projects';
import { fetchTeams } from '../store/teams';
import { fetchTasks } from '../store/tasks';

const Dashboard = () => {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.dashboard.teams);
  const projects = useSelector(state => state.dashboard.projects);
  const tasks = useSelector(state => state.dashboard.tasks);
  const isLoaded = teams.length > 0 && projects.length > 0 && tasks.length > 0;

  useEffect(() => {
    console.log('Dispatching actions...');
    // Fetch the dashboard data
    dispatch(fetchDashboard());
    // Fetch other relevant data (projects, teams, tasks)
    dispatch(fetchProjects());
    dispatch(fetchTeams());
    dispatch(fetchTasks());
  }, [dispatch]);

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render the dashboard data */}
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
