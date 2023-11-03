import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import axios from "axios";

export const SightID = ({ backend_url }) => {
  const [sightingInfo, setSightingInfo] = useState(null);
  const [dataState, setDataState] = useState(false);
  const params = useParams();

  const BACKEND_URL = backend_url;
  const sightingIndex = params.sightingIndex;

  useEffect(() => {
    const callAPI = async () => {
      console.log("initialised");
      let information = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}`
      );

      setSightingInfo(information);
      setDataState(true);
      console.log("called");
      console.log(sightingInfo);
      console.log(sightingInfo.data.YEAR);
    };

    callAPI();
  }, []);

  return (
    <>
      <div>Details about {sightingIndex}</div>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="border-red-400 border-2 w-[10em] h-[2em]">
        {dataState === true ? sightingInfo.data.YEAR : "no data"}
        {/* {sightingInfo !== null ? sightingInfo.data.YEAR : "no data"} */}
        {/* sighting info: {sightingInfo.data} */}
      </div>
      <div>
        <Link to="information">View Sightings</Link>
      </div>
      <Outlet />
    </>
  );
};
