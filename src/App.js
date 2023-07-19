import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import logo from "./logo.png";
import "./App.css";

export default function App() {
  const { pathname } = useLocation();
  const { sightingIndex } = useParams();

  // ========== FOR TESTING ========== //
  const location = useLocation();
  console.log(location);
  // ========== END ========== //

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ height: "80px", width: "80px" }}
          />
          <NavLink to="/" style={{ textDecoration: "none" }}>
            HOME
          </NavLink>
          <NavLink to="/sightings" style={{ textDecoration: "none" }}>
            ALL SIGHTINGS
          </NavLink>
        </div>
        {/* <Outlet/> use only within the parent route's component where you want the child routes to be rendered */}
        <Outlet context={sightingIndex} />
        {pathname === "/" && (
          <div className="home">
            <h2>BIGFOOT EXERCISE</h2>
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: "200px", width: "200px" }}
            />
          </div>
        )}
      </header>
    </div>
  );
}
