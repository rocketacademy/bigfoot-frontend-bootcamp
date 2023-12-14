import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getSightings = async () => {
      const newData = await axios.get(`${BACKEND_URL}/sightings`);
      setData(newData.data);
    };
    getSightings();
  }, []);

  const display =
    data &&
    data.map(({ date, location }, i) => {
      return (
        <div key={i}>
          <ul>
            <li>Date: {date}</li>
            <li>Location: {location}</li>
          </ul>
        </div>
      );
    });

  return (
    <div className="App-header">
      <h1>All Sighting List</h1>
      <Link to="/" className="home-button">
        <button>Go Home</button>
      </Link>
      <div className="list-div">{display}</div>
    </div>
  );
}
