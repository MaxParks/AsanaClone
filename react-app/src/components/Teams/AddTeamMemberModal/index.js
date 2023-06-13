import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createTeamMemberThunk } from "../../../store/teams";

function AddTeamMemberModal({ teamId }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const { closeModal } = useModal();

  const teamMembers = useSelector((state) => state.teams.selectedTeam.members);
  const teamName = useSelector((state) => state.teams.selectedTeam.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teamMembers.some((member) => member.email === email)) {
      setError(`User already a part of team ${teamName}`);
      return;
    }

    const data = await dispatch(createTeamMemberThunk(teamId, email));

    if (data && data.id) {
      closeModal();
      history.push(`/teams/${teamId}`);
      window.location.reload();
    } else if (data && data.message) {
      setError(data.message);
    } else {
      closeModal();
    }
  };

  return (
    <div className="create-team-modal-container">
      <h2>Invite Team Member</h2>
      <form onSubmit={handleSubmit} className="add-team-members-container">
        {error && <div className="error-message">{error}</div>}
        <div className="form-field-create-team">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter member email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="add-task-input"
          />
        </div>
        <div className="button-container">
          <button type="submit" className="create-button" disabled={!email}>
            Invite
          </button>
          <button type="button" className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeamMemberModal;
