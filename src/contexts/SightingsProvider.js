import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const SightingsContext = createContext([]);

function SightingsProvider({ children }) {
  const [sightings, setSightings] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`http://localhost:3000/sightings`);
      setSightings(data.data);
      return data;
    }
    fetchData();
  }, [update]);

  const updateSightingsContext = () => {
    setUpdate((prevUpdate) => !prevUpdate);
    console.log("Updated!");
  };

  const contextObj = {
    sightings,
    setSightings,
    updateSightingsContext,
  };

  return (
    <SightingsContext.Provider value={contextObj}>
      {children}
    </SightingsContext.Provider>
  );
}

export default SightingsProvider;
