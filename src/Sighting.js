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
    if (params.sightingIndex == 0) {
      index = 1;
    } else {
      index = params.sightingIndex + 1;
    }
    const data = await axios.get(
      "http://localhost:3000/sightings/" + `${index}`
    );
    console.log("DATA::::::::", data);
    console.log(data.data);
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
            key={sighting.REPORT_NUMBER}
            style={{
              borderRadis: "25%",
              border: "solid 3px black",
              margin: "10px",
            }}
          >
            <h4>
              {sighting.YEAR} - {sighting.MONTH} -- {sighting.STATE} -{" "}
              {sighting.COUNTY}{" "}
            </h4>
            <h5>
              {sighting.LOCATION_DETAILS} - {sighting.TIME_AND_CONDITIONS}
            </h5>
            <h6>{sighting.OBSERVED}</h6>
            <p>
              {sighting.OTHER_STORIES} - {sighting.OTHER_WITNESSES}
            </p>
            {/*  Implemented nested routing?  */}
          </div>
        ) : null}
      </div>
    );
  };

  return <>{display()}</>;
}
