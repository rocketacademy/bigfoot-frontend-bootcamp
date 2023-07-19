import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import { useSearchParams } from "react-router-dom";

export default function List() {
  const [sightings, setSightings] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const year = searchParams.get("year");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/sightings`, {
        params: { year: year },
      });
      console.log(data);
      setSightings(data);
    };

    fetchData();
  }, [year]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFiltered(true);
    setSearchParams({ year: userInput });
  };

  return (
    <div>
      <Link to="/new">Click Here to Add New Sighting</Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={({ target }) => setUserInput(target.value)}
          placeholder="Filter by year"
        />
      </form>

      {isFiltered
        ? sightings
            .filter((sighting) => sighting.date.includes(userInput))
            .map((filteredSighting) => (
              <ul key={filteredSighting.id}>
                <Link to={`/sightings/${filteredSighting.id}`}>
                  <li>Sighting {filteredSighting.id}</li>
                </Link>
                <li>Date: {filteredSighting.date}</li>
                <li>Location: {filteredSighting.location}</li>
                {filteredSighting.categories.length > 0 && (
                  <li>
                    Categories: {""}
                    {filteredSighting.categories
                      .map((category) => category.name)
                      .join(", ")}
                  </li>
                )}
              </ul>
            ))
        : sightings.map((sighting) => (
            <ul key={sighting.id}>
              <Link to={`/sightings/${sighting.id}`}>
                <li>Sighting {sighting.id}</li>
              </Link>
              <li>Date: {sighting.date}</li>
              <li>Location: {sighting.location}</li>

              {sighting.categories.length > 0 && (
                <li>
                  Categories:{" "}
                  {sighting.categories
                    .map((category) => category.name)
                    .join(", ")}
                </li>
              )}
            </ul>
          ))}
    </div>
  );
}
