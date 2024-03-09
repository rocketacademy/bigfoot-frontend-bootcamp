import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export const SightingResults = () => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const getSightings = async () => {
      try {
        const sightingsResults = await axios.get(`${BACKEND_URL}/sightings/`);
        console.log(sightingsResults.data);
        setSightings(sightingsResults.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSightings();
  }, []);

  return (
    <div className="prose max-w-full p-12">
      <h1 className="text-center">Big Foot Sighting</h1>
      <Link to={`/new`}>
        <button className="btn mb-10">New Sighting</button>
      </Link>
      {sightings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>LOCATION</th>
                <th>NOTES</th>
                <th>LINK</th>
                <th>CATEGORIES</th>
              </tr>
            </thead>
            <tbody>
              {sightings.map((sight) => (
                <tr key={sight.id}>
                  <td>{sight.date}</td>
                  <td>{sight.location}</td>
                  <td>{sight.notes}</td>
                  <td>
                    <Link to={`/sighting/${sight.id}`}>Details</Link>
                  </td>
                  <td>
                    {sight.categories.map((category) => (
                      <span key={category.id}>{category.name} </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
