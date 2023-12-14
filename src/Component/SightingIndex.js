import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  console.log(data);
  const display = data ? (
    <div>
      <ul>
        <li>Date: {data.date}</li>
        <li>Location: {data.location}</li>
      </ul>
    </div>
  ) : (
    "No data in this index."
  );

  return (
    <div>
      <ul>{display}</ul>
    </div>
  );
}
