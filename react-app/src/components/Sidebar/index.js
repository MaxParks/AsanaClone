import React, { useState } from "react";
import "../../assets/icons/collapse-caret.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import "./Sidebar.css"; // import the corresponding CSS file

const Sidebar = () => {
  const [isTeamsCollapsed, setIsTeamsCollapsed] = useState(true);
  const toggleTeams = () => {
    setIsTeamsCollapsed(!isTeamsCollapsed);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <div>
          <h1 className="sidebar-header">ZenFlow</h1>
        </div>
        <div className="sidebar-navigation-container">
          <ul className="sidebar-navigation">
            <div className="sidebar-tab">
              <HomeIcon />
              <li>Home</li>
            </div>
            <div>
              <li>My Tasks</li>
            </div>
            <div>
              <li>Inbox</li>
            </div>
          </ul>
        </div>
        <div className="sidebar-teams"></div>
      </div>
    </div>
  );
};

export default Sidebar;
