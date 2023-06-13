import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeamThunk } from "../../../store/teams";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

import "./AddTeamModal.css";

function AddTeamModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberEmails = members.split(",").map((email) => email.trim());

    // Check if current user's email exists in memberEmails array
    if (memberEmails.includes(sessionUser.email)) {
      setErrors(["You cannot add yourself as a member of the team."]);
      return;
    }

    const data = await dispatch(createTeamThunk(name, memberEmails));
    window.location.reload();

    if (data && data.id) {
      closeModal();
      history.push("/teams");
    } else if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="create-team-modal-container">
      <h2>Create New Team</h2>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-field-create-team">
          <label htmlFor="name">Team Name</label>
          <input
            type="text"
            className="add-task-input"
            id="name"
            placeholder="Team name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field-create-team">
          <label htmlFor="members">
            Members (comma-separated email addresses)
          </label>
          <textarea
            id="members"
            placeholder="Enter member emails separated by commas"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            className="task-textarea"
          ></textarea>
        </div>
        <div className="button-container">
          <button
            type="submit"
            className="create-button"
            disabled={errors.length > 0}
          >
            Create Team
          </button>
          <button type="button" className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeamModal;
