import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./Navigation/ProfileButton";

function Dashboard({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="page-container">
      <div className="header-container">
        <h1>Home</h1>
        <ProfileButton user={sessionUser} />
      </div>
    </div>
  );
}

export default Dashboard;
