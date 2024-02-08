import { Link, Outlet, useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { BACKEND_URL } from "../constants";

const SightingList = () => {
  const [sightings, setSightings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      const sightingData = response.data;
      setSightings(sightingData);
    });
  }, []);

  const sightingDetails = sightings.map((sighting, index) => {
    const { YEAR, SEASON, MONTH } = sighting;
    return (
      <div className="underline">
        <Link to={`/sightings/${index}`}>
          <div className="p-2">{`${YEAR ? YEAR : "No data"}, ${SEASON}, ${
            MONTH ? MONTH : "No data"
          }`}</div>
        </Link>
      </div>
    );
  });

  return (
    <>
      <div className="text-center">
        <h1 className="font-bold">All Sightings</h1>
        <div className="py-4">
          <div className="mb-6">
            <Link to="about">About</Link>
          </div>
          <Outlet />
          <div className="mt-9">
            <input
              className="border border-lg p-2 rounded-lg mr-6"
              type="text"
              placeholder="Search for..."
              id="search"
              value={searchParams.get("year")}
              onChange={(e) => setSearchParams({ year: e.target.value })}
            />
          </div>

          {/* <div>
            <Link
              to="filter"
              state={{
                data: sightings,
              }}
            >
              Filter
            </Link>
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 p-9 m-9">
          {sightingDetails}
        </div>
      </div>
    </>
  );
};

export default SightingList;
