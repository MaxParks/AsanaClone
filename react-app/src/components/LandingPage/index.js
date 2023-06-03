import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./LandingPage.css";

function LandingPage({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="page-container">
      <div className="header-container">
        <NavLink exact to="/">
          ZenFlow
        </NavLink>
        <div className="header-button-container">
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Get Started"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
