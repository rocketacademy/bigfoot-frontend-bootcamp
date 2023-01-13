import "../App.css";
import logo from "../logo.png";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";

export function Sightings() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings`)
      .then(({ data }) => {
        setSightings(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <table>
            <tr>
              <th>YEAR</th>
              <th>MONTH</th>
              <th>SEASON</th>
            </tr>
            {sightings.map(({ YEAR, MONTH, SEASON }) => (
              <tr>
                <td>{YEAR}</td>
                <td>{MONTH}</td>
                <td>{SEASON}</td>
              </tr>
            ))}
          </table>
        </div>
      </header>
    </div>
  );
}
