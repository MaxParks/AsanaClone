import React from "react";
import { useSelector } from "react-redux";

function Team({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return <h1>Team</h1>;
}

export default Team;
