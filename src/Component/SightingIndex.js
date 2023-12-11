import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingIndex() {
  const { sightingIndex } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const getOneData = async () => {
      const newData = await axios.get(
        `${BACKEND_URL}/sightings/${sightingIndex}`
      );
      setData(newData.data);
    };
    getOneData();
  }, [sightingIndex]);

  const display = Object.entries(data).map(([key, value]) => {
    return (
      <li key={key}>
        {key}: {value}
      </li>
    );
  });

  return (
    <div>
      <ul>{display.length ? display : "No data in this index."}</ul>
    </div>
  );
}
