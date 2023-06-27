import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sighting() {
  const { sightingsIndex } = useParams();
  const navigate = useNavigate();
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/sightings");
      console.log(data);
      setSightings(data);
    };

    fetchData();
  }, []);

  const backToHomePage = () => {
    navigate('/');
  };

  let sighting = [];
  for (const key in sightings[sightingsIndex - 1]) {
    sighting.push(
      `${key}: ${sightings[sightingsIndex - 1][key]}`,
      <>
        <br />
        <br />
      </>
    );
  }

  return (
    <div>
      <button onClick={backToHomePage}>Home</button>
      <br />
      <br />
      {sightings && sightings.length > 0 && sighting}
    </div>
  );
}
