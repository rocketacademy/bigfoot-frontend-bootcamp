import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const App = () => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const getSightings = async () => {
      try {
        const sightingsResults = await axios.get(
          "http://localhost:3000/sightings"
        );
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
      {sightings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>YEAR</th>
                <th>SEASON</th>
                <th>MONTH</th>
                <th>LINK</th>
              </tr>
            </thead>
            <tbody>
              {sightings.map((sight, index) => (
                <tr key={sight.REPORT_NUMBER + index}>
                  <td>{sight.YEAR}</td>
                  <td>{sight.SEASON}</td>
                  <td>{sight.MONTH}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
