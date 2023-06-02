import React from "react";
import { useSelector } from "react-redux";

import Navigation from "./Navigation";
import ProfileButton from "./Navigation/ProfileButton";

function LandingPage({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <h1>Hello</h1>
      <Navigation />
      <ProfileButton user={sessionUser} />
    </>
  );
}

export default LandingPage;
