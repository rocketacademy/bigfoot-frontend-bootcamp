import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export default function List() {
  const [sightings, setSightings] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/sightings`);
      console.log(data);
      setSightings(data);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFiltered(true);
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
            .map((filteredSighting) => {
              const originalIndex = sightings.findIndex(
                (s) => s === filteredSighting
              );
              return (
                <ul key={originalIndex}>
                  <Link to={`/sightings/${originalIndex + 1}`}>
                    <li>Sighting {originalIndex + 1}</li>
                  </Link>
                  <li>Date: {filteredSighting.date}</li>
                  <li>Location: {filteredSighting.location}</li>
                </ul>
              );
            })
        : sightings.map((sighting, index) => (
            <ul key={index}>
              <Link to={`/sightings/${index + 1}`}>
                <li>Sighting {index + 1}</li>
              </Link>
              <li>Date: {sighting.date}</li>
              <li>Location: {sighting.location}</li>
            </ul>
          ))}
    </div>
  );
}
