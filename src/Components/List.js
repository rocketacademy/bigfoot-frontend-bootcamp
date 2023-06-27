import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function List() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/sightings");
      console.log(data);
      setSightings(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {sightings.map((sighting, index) => (
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
