import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export default function SightingInfo() {
  const { sightingID } = useParams();
  const [selectedSighting, setSelectedSighting] = useState({});
  console.log(selectedSighting);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings/${sightingID}`).then((response) => {
      setSelectedSighting(response.data);
    });
  }, [sightingID]);

  const { date, location, notes, createdAt, updatedAt } = selectedSighting;

  return (
    <div className="Sighting-details">
      <h1>Sighting Details</h1>
      <p>Date Sighted: {date}</p>
      <p>Location: {location}</p>
      <p>Notes: {notes}</p>
      <p>
        Created:{createdAt} Updated: {updatedAt}
      </p>
    </div>
  );
}
