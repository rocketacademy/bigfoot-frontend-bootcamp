import { useRoutes } from "react-router-dom";

// Components
import App from "./App";
import SightingInfo from "./pages/SightingInfo";
import NewSighting from "./pages/NewSighting";

const RoutesObject = () => {
  const routes = useRoutes([
    { path: "/", element: <App /> },
    {
      path: "sightings/:int",
      element: <SightingInfo />,
    },
    {
      path: "/new",
      element: <NewSighting />,
    },
  ]);

  return routes;
};

export default RoutesObject;
