import { Link, NavLink, Outlet, useParams } from "react-router-dom";

export const SightID = () => {
  const params = useParams();
  const sightingIndex = params.sightingIndex;
  return (
    <>
      <div>Details about {sightingIndex}</div>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <Link to="information">View Sightings</Link>
      </div>
      <Outlet />
    </>
  );
};
