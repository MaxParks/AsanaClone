import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./Navigation/ProfileButton";

import "./Navigation/Navigation.css";

function Dashboard({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div
      className="page-container"
      style={{ backgroundColor: "var(--color-charcoal)" }}
    >
      <div className="header-container">
        <h1 className="header-title">Home</h1>
        <ProfileButton user={sessionUser} />
      </div>
    </div>
  );
}

export default Dashboard;
