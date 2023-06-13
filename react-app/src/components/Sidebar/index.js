import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDashboardThunk } from "../../store/dashboard";
import "../../assets/icons/collapse-caret.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as Checkmark } from "../../assets/icons/checkmark.svg";
import { ReactComponent as NotificationBell } from "../../assets/icons/notification-bell.svg";
import { ReactComponent as PlusButton } from "../../assets/icons/plus.svg";
import "./Sidebar.css";
import TeamDropdown from "../Teams/TeamDropdown";
import AddTeamModal from "../Teams/AddTeamModal";
import OpenModalButton from "../OpenModalButton";
import { getSingleTeamThunk } from "../../store/teams";

const Sidebar = ({
  openTeamDropdown,
  selectedTeamId,
  selectedTeamData,
  closeTeamDropdown,
}) => {
  const dashboardData = useSelector((state) => state.dashboard);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDashboardThunk());
  }, [dispatch]);

  const handleHomeClick = () => {
    history.push("/user/dashboard");
  };

  const handleTasksOrInboxClick = () => {
    window.alert("Coming Soon!");
  };

  const handleTeamNameClick = (teamId) => {
    dispatch(getSingleTeamThunk(teamId));
    history.push(`/teams/${teamId}`);
  };

  const toggleTeamDropdown = (teamId) => {
    if (openDropdowns.includes(teamId)) {
      setOpenDropdowns(openDropdowns.filter((id) => id !== teamId));
      openTeamDropdown(null, null);
    } else {
      const currentlyOpenDropdown = openDropdowns[0];
      if (currentlyOpenDropdown) {
        setOpenDropdowns(
          openDropdowns.filter((id) => id !== currentlyOpenDropdown)
        );
        closeTeamDropdown();
      }

      setOpenDropdowns([teamId]);
      const teamData = dashboardData.teams[teamId];
      openTeamDropdown(teamId, teamData);
    }
  };

  return (
    <div className="sidebar-content">
      <div>
        <h1 className="sidebar-header" onClick={handleHomeClick}>
          ZenFlow
        </h1>
      </div>
      <div className="sidebar-navigation-container">
        <ul className="sidebar-navigation">
          <div className="sidebar-tab" onClick={handleHomeClick}>
            <HomeIcon />
            <li className="second-tab-item">Home</li>
          </div>
          <div className="sidebar-tab" onClick={handleTasksOrInboxClick}>
            <Checkmark />
            <li className="second-tab-item">My Tasks</li>
          </div>
          <div className="sidebar-tab" onClick={handleTasksOrInboxClick}>
            <NotificationBell />
            <li className="second-tab-item">Inbox</li>
          </div>
        </ul>
      </div>
      <div className="sidebar-teams">
        <div className="sidebar-tab">
          <p>Teams</p>
          <div className="second-tab-item centered">
            <OpenModalButton
              modalComponent={<AddTeamModal />}
              className="add-team-shortcut"
            />
          </div>
        </div>
        <ul className="team-list">
          {dashboardData.teams &&
            Object.values(dashboardData.teams).map((team) => (
              <li key={team.id}>
                <div
                  className={`team-name${
                    selectedTeamId === team.id ? " active" : ""
                  }`}
                  onClick={() => handleTeamNameClick(team.id)}
                >
                  <div
                    className={`team-arrow${
                      openDropdowns.includes(team.id) ? " rotated" : ""
                    }`}
                    onClick={() => toggleTeamDropdown(team.id)}
                  ></div>
                  {team.name}
                </div>
                {selectedTeamId === team.id && (
                  <div
                    className={`team-dropdown${
                      openDropdowns.includes(team.id) ? " open" : ""
                    }`}
                  >
                    <TeamDropdown
                      teamId={team.id}
                      closeTeamDropdown={closeTeamDropdown}
                      selectedTeamData={dashboardData.teams[team.id]} // Pass the latest team data
                    />
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
