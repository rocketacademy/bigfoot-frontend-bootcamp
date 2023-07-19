import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

export default function SightingList() {
  const [sightings, setSightings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   getSightings();
  // }, [searchParams]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      getSightings();
    }, 500);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchParams]);

  const getSightings = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/sightings`,
      { params: { filter: searchParams.get("filter") || "" } }
    );
    setSightings(response.data);
  };

  return (
    <div>
      <br />
      <div>Search</div>
      <input
        type="text"
        value={searchParams.get("filter")}
        onChange={(e) => setSearchParams({ filter: e.target.value })}
      />
      <div>
        {sightings.map((sighting, index) => (
          <div key={index} style={{ marginTop: "2rem", fontSize: "1rem" }}>
            <div>
              <strong>Sighting No.</strong> {index + 1}
            </div>
            <div>
              <strong>Year:</strong> {sighting.YEAR}
            </div>
            <div>
              <strong>Season:</strong> {sighting.SEASON}
            </div>
            <div>
              {sighting.MONTH ? (
                <div>
                  <strong>Month:</strong> {sighting.MONTH}
                </div>
              ) : (
                <div>
                  <strong>Month:</strong> N/A
                </div>
              )}
            </div>
            <Link to={`/sightings/${index}`}>More Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
