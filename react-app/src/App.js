import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authenticate } from "./store/session";

import LandingPage from './components/LandingPage'
import SignupFormPage from './components/SignupFormPage'
import LoginFormPage from './components/LoginFormPage'
import Sidebar from './components/Sidebar'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import UserTasks from './components/Tasks/UserTasks'
// import Task from './components/task'
import TeamDropdown from './components/Teams/TeamDropdown'
import Team from './components/Teams'
import GetProject from './components/Projects/GetProject'

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  // save state of the teams and the data associated to them in team list
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamData, setSelectedTeamData] = useState(null);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // pass team dropdown state to the Sidebar as prop to render it there
  const openTeamDropdown = (teamId, teamData) => {
    setSelectedTeamId(teamId);
    setSelectedTeamData(teamData);
  };

  const closeTeamDropdown = () => {
    setSelectedTeamId(null);
    setSelectedTeamData(null);
  };

  return (
    <>
      {isLoaded && (
        <div className="App">
          {user && (
            <Sidebar
              closeTeamDropdown={closeTeamDropdown}
              openTeamDropdown={openTeamDropdown}
              selectedTeamId={selectedTeamId}
              selectedTeamData={selectedTeamData}
            />
          )}
          <div className="Content">
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
              <Route path="/projects/:id">
                <GetProject />
              </Route>
              <Route exact path="/user/dashboard/">
                {user ? <Dashboard /> : <Redirect to="/" />}
              </Route>
              <Route exact path='/teams/:teamId'>
                {user ? <Team /> : <Redirect to='/' />}
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
