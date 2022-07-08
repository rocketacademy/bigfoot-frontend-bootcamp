import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sighting() {
  let params = useParams();

  const [sighting, setSighting] = useState({});
  let index;

  async function callAPI() {
    console.log("Calling API");
    console.log(params.sightingIndex);
    index = params.sightingIndex;
    const data = await axios.get(
      "http://localhost:3000/sighting/" + `${index}`
    );
    console.log(data);

    setSighting(data.data);
  }

  useEffect(() => {
    callAPI();
    console.log(sighting);
  }, []);

  const display = () => {
    return (
      <div>
        <h1>Sightings Single</h1>
        {sighting ? (
          <div
            key={sighting.id}
            style={{
              borderRadis: "25%",
              border: "solid 3px black",
              margin: "10px",
            }}
          >
            <h4>{new Date(sighting.date).toLocaleDateString()}</h4>
            <h5>{sighting.location}</h5>
            <h6>{sighting.notes}</h6>
          </div>
        ) : null}
      </div>
    );
  };

  return <>{display()}</>;
}
