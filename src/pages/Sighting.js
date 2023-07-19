import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SightingsList() {
  const [sighting, setSighting] = useState([]);
  const sightingIndex = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (sightingIndex) {
      console.log(`sighting index`, sightingIndex);
      getSightingIndex();
    }
  }, [sightingIndex]);

  const getSightingIndex = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/sightings/${sightingIndex}`
    );
    setSighting(response.data);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ margin: "3rem" }}>
      <button onClick={handleBack}>Back to Previous Page</button>
      <br />
      <br />
      <div>
        <strong>SIGHTING #{parseInt(sightingIndex) + 1}</strong>
      </div>
      <br />
      <div>
        <strong>Year: </strong>
        {sighting.YEAR}
      </div>
      <div>
        <strong>Location: </strong>
        {sighting.LOCATION_DETAILS}
      </div>
      <div>
        <strong>Season: </strong>
        {sighting.SEASON}
      </div>
      {sighting.MONTH ? (
        <div>
          <strong>Month: </strong>
          {sighting.MONTH}
        </div>
      ) : (
        <div>
          <strong>Month: </strong>N/A
        </div>
      )}
      <div>
        <strong>Observed: </strong>
        {sighting.OBSERVED}
      </div>
    </div>
  );
}
