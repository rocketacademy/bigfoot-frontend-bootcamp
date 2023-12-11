import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingFilter() {
  const { filter, filterData } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getFilterData = async () => {
      const newData = await axios.get(
        `${BACKEND_URL}/sightings/${filter}/${filterData}`
      );
      setData(newData.data);
    };
    getFilterData();
  }, [filter, filterData]);
  const display = data.map((arrData, i) => {
    const filterData = Object.entries(arrData).map(([key, value], i) => {
      return (
        <li key={"arrData" + key}>
          {key}: {value}
        </li>
      );
    });
    return (
      <ul key={"listData" + i}>
        {filterData}
        <br />
      </ul>
    );
  });

  return <div>{display.length ? display : `No data in ${filter}.`}</div>;
}
