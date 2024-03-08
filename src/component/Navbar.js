import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="mt-28 mx-24 mb-4  p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center bg-orange-100 p-9">
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
          <div>
            <NavLink to="/sightings">Sightings</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
