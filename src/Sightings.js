import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sightings(props) {
  const [sightings, setSightings] = useState([]);
  // const [search, setSearch] = useState("");

  async function callData() {
    // if (search.length > 0) {
    //   console.log("searching for data");
    //   let sightingsData = await axios.get(
    //     `http://localhost:3000/sightings/search/${search}`
    //   );
    //   console.log(sightingsData.data);
    //   setSightings({
    //     sightings: sightingsData.data,
    //   });

    //   console.log("okay");
    // } else {
    let sightingsData = await axios.get(`http://localhost:3000/sightings/`);
    console.log(sightingsData.data);
    setSightings({
      sightings: sightingsData.data,
    });

    console.log("okay");
    // }
  }
  useEffect(
    () => {
      callData();
      console.log("Yes");
    },
    [
      /* search*/
    ]
  );

  const display = (props) => {
    return (
      <div>
        <h1>Sightings</h1>

        {sightings.sightings && sightings.sightings.length > 0
          ? sightings.sightings.map((data, index) => (
              <div
                key={data.id}
                style={{
                  borderRadis: "25%",
                  border: "solid 3px black",
                  margin: "10px",
                }}
              >
                <h4>{new Date(data.date).toLocaleDateString()}</h4>
                <h5>{data.location}</h5>
                {/*  Implemented nested routing?  */}
                <Link to={`/sightings/${data.id}`}>Learn much more!</Link>
                <br />
                <Link to={`/sightings/${data.id}/edit`}>
                  Edit this sighting
                </Link>
              </div>
            ))
          : null}
      </div>
    );
  };

  return <>{display(props)}</>;
}
