import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export default function SightingInfo() {
  const { sightingID } = useParams();
  const [selectedSighting, setSelectedSighting] = useState({});

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings/${sightingID}`).then((response) => {
      setSelectedSighting(response.data);
      console.log(response.data);
    });
  }, [sightingID]);

  const { date, location, notes, created_at, updated_at } = selectedSighting;

  return (
    <div className="Sighting-details">
      <h1>Sighting Details</h1>
      <p>Date Sighted: {date}</p>
      <p>Location: {location}</p>
      <p>Notes: {notes}</p>
    </div>
  );
}
