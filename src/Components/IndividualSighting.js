import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export const IndividualSighting = ({ sightingIndex }) => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const getSightings = async () => {
      try {
        const sightingsResults = await axios.get(
          `${BACKEND_URL}/sightings/${sightingIndex}`
        );
        console.log(`${BACKEND_URL}sightings/${sightingIndex}`);
        console.log(sightingsResults.data);
        setSightings(sightingsResults.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSightings();
  }, [sightingIndex]);

  return (
    <div className="prose max-w-full p-12">
      <h1 className="text-center">Big Foot Sighting</h1>
      <Link to={`/`}>
        <button className="btn mb-10">Back</button>
      </Link>
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            {Object.entries(sightings).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
