import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authenticate } from "./store/session";

import LandingPage from "./components/LandingPage";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import UserTasks from "./components/Tasks/UserTasks";
import Team from "./components/Team";
import GetProject from "./components/Projects/GetProject";

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
        <div className="App">
          {user && <Sidebar />}
          <div className="Content">
            {/* {user && <Navigation isLoaded={isLoaded} />} */}
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
                {user ? <UserTasks /> : <Redirect to="/" />}
              </Route>

              <Route path="/projects/:id">
                {user ? <GetProject /> : <Redirect to="/" />}
              </Route>

              <Route path="/teams/:id">
                {user ? <Team /> : <Redirect to="/" />}
              </Route>

              <Route path="*">
                <h1>404 Not Found</h1>
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
