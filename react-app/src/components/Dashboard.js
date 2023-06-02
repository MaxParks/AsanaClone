import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./Navigation/ProfileButton";

function Dashboard({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <h1>Dashboard</h1>
      <ProfileButton user={sessionUser} />
    </>
  );
}

export default Dashboard;
