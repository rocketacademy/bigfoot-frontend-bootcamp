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

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={({ target }) => setUserInput(target.value)}
        placeholder="Filter by year"
        onMouseLeave={() => setIsFiltered(true)}
      />

      {isFiltered
        ? sightings
            .filter((sighting) => sighting.YEAR === userInput)
            .map((filteredSighting) => {
              const originalIndex = sightings.findIndex(
                (s) => s === filteredSighting
              );
              return (
                <ul key={originalIndex}>
                  <Link to={`/sightings/${originalIndex + 1}`}>
                    <li>Sighting {originalIndex + 1}</li>
                  </Link>
                  <li>Year: {filteredSighting.YEAR}</li>
                  <li>Season: {filteredSighting.SEASON}</li>
                  <li>Month: {filteredSighting.MONTH}</li>
                  <li>Country: {filteredSighting.COUNTY}</li>
                </ul>
              );
            })
        : sightings.map((sighting, index) => (
            <ul key={index}>
              <Link to={`/sightings/${index + 1}`}>
                <li>Sighting {index + 1}</li>
              </Link>
              <li>Year: {sighting.YEAR}</li>
              <li>Season: {sighting.SEASON}</li>
              <li>Month: {sighting.MONTH}</li>
              <li>Country: {sighting.COUNTY}</li>
            </ul>
          ))}
    </div>
  );
}
