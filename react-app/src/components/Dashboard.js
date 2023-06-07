import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfileButton from "./Navigation/ProfileButton";
import { getDashboardThunk } from "../store/dashboard";

import "./Navigation/Navigation.css";

function Dashboard({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getDashboardThunk());
  }, [dispatch]);

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
