import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export default function Sighting() {
  const { sightingsId } = useParams();
  const navigate = useNavigate();
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/sightings`);
      console.log(data);
      setSightings(data);
    };

    fetchData();
  }, []);

  const backToHomePage = () => {
    navigate("/");
  };

  let sighting = [];
  for (const key in sightings[sightingsId - 1]) {
    sighting.push(
      `${key}: ${sightings[sightingsId - 1][key]}`,
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
      {console.log(sighting)}
      {sightings && sightings.length > 0 && sighting}
    </div>
  );
}
