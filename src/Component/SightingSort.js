import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constant";

export default function SightingSort() {
  const { filter, filterData, sort, direction } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getFilterData = async () => {
      const newData = await axios.get(
        `${BACKEND_URL}/sightings/${filter}/${filterData}`
      );
      const sortedData = newData.data.sort((a, b) =>
        !a[sort]
          ? 1
          : !b[sort]
          ? -1
          : direction === "ascending"
          ? a[sort].match(/\d+/) - b[sort].match(/\d+/)
          : b[sort].match(/\d+/) - a[sort].match(/\d+/)
      );

      setData(sortedData);
    };
    getFilterData();
  }, [filter, filterData, sort, direction]);
  const display = data.map((arrData, i) => {
    const sortData = Object.entries(arrData).map(([key, value]) => {
      return (
        <li key={"arrData" + key}>
          {key}: {value}
        </li>
      );
    });
    return (
      <ul key={"listData" + i}>
        {sortData}
        <br />
      </ul>
    );
  });

  return <div>{display}</div>;
}
