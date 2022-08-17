import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export default function Sightings(props) {
  const [sightings, setSightings] = useState([]);
  const [weather, setWeather] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState("");

  async function callData() {
    let sightingsData = await axios.get(`http://localhost:3000/sightings/`);
    console.log(sightingsData.data);
    setSightings({
      sightings: sightingsData.data,
    });

    console.log("okay");
  }

  const callForCategories = async () => {
    const weatherCats = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/categories/`
    );
    console.log(weatherCats);
    const names = weatherCats.data.map((cat) => {
      return { value: cat.id, label: cat.name };
    });
    setWeather(names);
  };

  useEffect(() => {
    callForCategories();
    callData();
  }, []);

  let filtered;
  if (
    selectedWeather !== "" &&
    sightings.sightings &&
    sightings.sightings.length > 0
  ) {
    filtered =
      sightings.sightings && sightings.sightings.length > 0
        ? sightings.sightings.filter((sighting) =>
            sighting.categories.length > 0
              ? sighting.categories[0].name === selectedWeather
              : false
          )
        : null;

    console.log(filtered);
  }
  console.log("1", sightings);
  console.log("2", sightings.sightings);
  console.log("3", sightings.sightings !== undefined);

  return (
    <div>
      <h1>Sightings</h1>
      <Select
        options={weather}
        onChange={(e) => {
          setSelectedWeather(e.label);
        }}
      />

      <h3>{selectedWeather}</h3>

      {filtered !== undefined && filtered && filtered.length > 0
        ? filtered.map((data) => (
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
              <Link to={`/sightings/${data.id}`}>Learn much more!</Link>
              <br />
              <Link to={`/sightings/${data.id}/edit`}>Edit this sighting</Link>
              {data.categories && data.categories.length > 0 ? (
                <h4>{data.categories[0].name}</h4>
              ) : null}
            </div>
          ))
        : null}

      {filtered !== undefined && filtered && filtered.length > 0 ? null : (
        <>
          <h3>All Sightings </h3>

          {sightings.sightings !== undefined &&
          sightings &&
          sightings.sightings.length > 0
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
                  <Link to={`/sightings/${data.id}`}>Learn much more!</Link>
                  <br />
                  <Link to={`/sightings/${data.id}/edit`}>
                    Edit this sighting
                  </Link>
                  {data.categories && data.categories.length > 0 ? (
                    <h4>{data.categories[0].name}</h4>
                  ) : null}
                </div>
              ))
            : null}
        </>
      )}
    </div>
  );
}
