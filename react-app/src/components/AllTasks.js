import React from "react";
import { useSelector } from "react-redux";

function AllTasks({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return <h1>All Tasks</h1>;
}

export default AllTasks;
