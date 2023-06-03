import React from "react";
import { useSelector } from "react-redux";

function Project({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return <h1>Project</h1>;
}

export default Project;
