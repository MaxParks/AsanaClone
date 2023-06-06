import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/projects';
import { fetchTeams } from '../store/teams';
import { fetchTasks } from '../store/tasks';

const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const teams = useSelector((state) => state.teams);
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTeams());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
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
