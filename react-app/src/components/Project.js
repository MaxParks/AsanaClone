import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProjectThunk } from "../store/projects";
import { useParams } from "react-router-dom";

function Project({ isLoaded }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getProjectThunk(id));
  }, [dispatch, id]);

  return <h1>Project</h1>;
}

export default Project;
