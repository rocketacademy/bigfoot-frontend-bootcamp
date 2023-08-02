import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function SightingList() {
  const [sightings, setSightings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
    console.log(searchParams.get("filter"));
    console.log(response.data);
    setSightings(response.data);
  };

  useEffect(() => {}, [sightings]);

  const deleteSighting = async (id) => {
    let confirmation = window.prompt("Delete sighting? (Y/N)");
    if (confirmation === "Y" || confirmation === "y") {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/sightings/${id}`
      );
      alert("Sighting has been deleted!");
      setSightings(response.data);
    }
  };

  return (
    <div>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div>Search:</div>
        <input
          type="text"
          value={searchParams.get("filter")}
          onChange={(e) => setSearchParams({ filter: e.target.value })}
          style={{
            width: "40vw",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#ffffffa1",
          }}
        />
      </div>
      <div className="flex">
        {sightings.map((sighting) => (
          <div key={sighting.id} className="outerContainer">
            <div className="innerContainer">
              <div>
                <strong>Sighting #{sighting.id}</strong>
              </div>
              <br />
              <div>
                <strong>Date:</strong> {sighting.date}
              </div>
              <div>
                <strong>Category:</strong>{" "}
                {sighting.categories && sighting.categories.length > 0
                  ? sighting.categories[0].name
                  : "N/A"}
              </div>
              <div>
                <strong>Location: </strong> {sighting.location}
              </div>
              <div
                style={{
                  height: "3rem",
                  overflow: "hidden",
                  marginBottom: "1rem",
                }}
              >
                <strong>Notes:</strong> {sighting.notes}
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button className="buttons">
                  <a
                    href={`/sightings/${sighting.id}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    View Details/Edit
                  </a>
                </button>
                {/* <Link
                  to={`/sightings/${sighting.id}`}
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    marginRight: "1rem",
                  }}
                >
                  View Details/Edit
                </Link> */}
                <button
                  className="buttons"
                  style={{ background: "#383838" }}
                  onClick={() => deleteSighting(sighting.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
