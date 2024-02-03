import { useRoutes } from "react-router-dom";

// Components
import App from "./App";
import SightingInfo from "./SightingInfo";

const RoutesObject = () => {
  const routes = useRoutes([
    { path: "/", element: <App /> },
    {
      path: ":int",
      element: <SightingInfo />,
      children: [{ path: ":str", element: <SightingInfo /> }],
    },
  ]);

  return routes;
};

export default RoutesObject;
