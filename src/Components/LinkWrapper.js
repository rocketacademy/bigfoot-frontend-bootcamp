import React from "react";
import { Link, NavLink } from "react-router-dom";

export const LinkWrapper = ({ children, sightingid }) => {
  return (
    <>
      <NavLink
        to={`sightings/${sightingid}`}
        className=""
        style={{ display: "block", height: "inherit" }}
      >
        {children}
      </NavLink>
    </>
  );
};
