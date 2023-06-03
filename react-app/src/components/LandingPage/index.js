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
    <div className="page-container" style={{ backgroundColor: "#EEEBEA" }}>
      <div className="header-container">
        <NavLink
          exact
          to="/"
          style={{ fontWeight: "medium", fontSize: "32px" }}
        >
          ZenFlow
        </NavLink>
        <div className="header-button-container">
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
            className="button-login"
          />

          <OpenModalButton
            buttonText="Get Started"
            modalComponent={<SignupFormModal />}
            className="button-get-started"
          />
        </div>
      </div>
      <div className="hero-container">
        <div class="flex-split">
          <div class="left-side">
            <h3>Your ultimate cross-functional work platform</h3>
            <p style={{ fontSize: "16px" }}>
              Boost productivity effortlessly. ZenFlow empowers every team to
              deliver quality work, swiftly
            </p>
            <div class="cta-buttons">
              <OpenModalButton
                buttonText="Get Started"
                modalComponent={<SignupFormModal />}
                className="button-get-started"
              />
              <button className="button-transparent">Learn How It Works</button>
            </div>
          </div>
          <div class="right-side">
            <img src="../../assets/images/hero-image.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
