import { useParams } from "react-router-dom";
import logo from "../logo.png";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { Link } from "react-router-dom";

export function OneSighting() {
  let params = useParams();
  const [sightings, setSightings] = useState({});
  const [keyArray, setKeyArray] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings/${params.sightingIndex}`)
      .then(({ data }) => {
        setSightings(data);
        setKeyArray(Object.keys(data));
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
          <Link to="/sightings" style={{ color: "blue" }}>
            Back
          </Link>
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <td>BIGFOOT SIGHTING</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {keyArray.map((item, key) => (
                <tr key={key}>
                  <td
                    style={{
                      border: "solid white 1px",
                    }}
                  >
                    {item}
                  </td>
                  <td
                    style={{
                      border: "solid white 1px",
                    }}
                  >
                    {sightings[item]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}
