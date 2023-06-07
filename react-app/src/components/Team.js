import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTeams} from "../store/teams"
import { useParams } from "react-router-dom";
// import "./Team.css";

function Team({ isLoaded }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const teamData = useSelector((state) => state.teams);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchTeams(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Team: {teamData.name}</h1>
      {/* <p>Members: {teamData.description}</p> */}
      <h2>Projects:</h2>
      <ul>
        {teamData.projects && teamData.projects.map((project) => (
          <li key={project.id}>
            {project.name}
          </li>
))}
      </ul>
    </div>
  );
}

export default Team;
