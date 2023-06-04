import React, { useState } from "react";
import "../../assets/icons/collapse-caret.svg";
import "./Sidebar.css"; // import the corresponding CSS file

const Sidebar = () => {
  const [isTeamsCollapsed, setIsTeamsCollapsed] = useState(true);
  const toggleTeams = () => {
    setIsTeamsCollapsed(!isTeamsCollapsed);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h1>ZenFlow</h1>
        </div>
        <div className="sidebar-navigation">
          <ul>
            <li>Home</li>
            <li>My Tasks</li>
            <li>Inbox</li>
          </ul>
        </div>
        <div className="sidebar-teams"></div>
      </div>
    </div>
  );
};

export default Sidebar;
