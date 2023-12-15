import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingIndex() {
  const { sightingIndex } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getOneData = async () => {
      const newData = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}`
      );
      setData(newData.data);
    };
    getOneData();
  }, [sightingIndex]);

  const display = data ? (
    <div>
      <ul>
        <li>Date: {data.date}</li>
        <li>City: {data.city}</li>
        <li>Country: {data.country}</li>
        <li>Location: {data.locationDescription}</li>
        <li>Note: {data.notes}</li>
      </ul>
    </div>
  ) : (
    "No data in this id."
  );

  return (
    <div className="index-div">
      <ul>{display}</ul>
      {data && (
        <Link to={`/sightingSearch/${sightingIndex}/edit`}>
          <button>Edit data</button>
        </Link>
      )}
    </div>
  );
}
