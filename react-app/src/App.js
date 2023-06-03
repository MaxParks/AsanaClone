import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authenticate } from "./store/session";

import LandingPage from "./components/LandingPage";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AllTasks from "./components/AllTasks";
import Team from "./components/Team";
import Project from "./components/Project";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div>
          {user && <Navigation />}

          <Switch>
            <Route exact path="/">
              {user ? <Redirect to="/user/dashboard/" /> : <LandingPage />}
            </Route>

            <Route path="/login">
              <LoginFormPage />
            </Route>

            <Route path="/signup">
              <SignupFormPage />
            </Route>

            <Route path="/user/dashboard">
              {user ? <Dashboard /> : <Redirect to="/" />}
            </Route>

            <Route path="/tasks/current">
              {user ? <AllTasks /> : <Redirect to="/" />}
            </Route>

            <Route path="/projects/:id">
              {user ? <Project /> : <Redirect to="/" />}
            </Route>

            <Route path="/teams/:id">
              {user ? <Team /> : <Redirect to="/" />}
            </Route>

            <Route path="*">
              <h1>404 Not Found</h1>
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
