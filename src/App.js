import React from "react";
import logo from "./logo.png";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [year, setYear] = useState([]);
  const [season, setSeason] = useState([]);
  const [month, setMonth] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/sightings");
      console.log(data);

      data.forEach((data) => {
        setYear((y) => [...y, data.YEAR]);
        setSeason((s) => [...s, data.SEASON]);
        setMonth((m) => [...m, data.MONTH]);
        setCountry((c) => [...c, data.COUNTY]);
      });
    };

    fetchData();
  }, []);

  const dataRendered = year.map((year, index) => (
    <ul key={year + season + month + country + index}>
      <li>Sighting {index + 1}</li>
      <li>Year: {year}</li>
      <li>Season: {season[index]}</li>
      <li>Month: {month[index]}</li>
      <li>Country: {country[index]}</li>
    </ul>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {dataRendered}
      </header>
    </div>
  );
}

export default App;
