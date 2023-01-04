import { Space, Table } from "antd";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { SelectYearForm } from "./selectYearForm";
export function Sightings({ filter }) {
  const [sightings, setSightings] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (searchParams.has("year")) {
      axios
        .get(`${BACKEND_URL}/sightings`, {
          params: { year: searchParams.get("year") },
        })
        .then(({ data: sightings }) => {
          console.log(searchParams.toString());
          console.log(sightings);
          setSightings(sightings);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`${BACKEND_URL}/sightings`)
        .then(({ data: sightings }) => {
          setSightings(sightings);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchParams]);

  useEffect(() => {
    manipulatedSightings = sightings.map((sighting, index) => {
      return {
        index: index,
        report_number: sighting.REPORT_NUMBER,
        year: sighting.YEAR,
        season: sighting.SEASON,
        state: sighting.STATE,
      };
    });
  }, [sightings]);

  const columns = [
    {
      title: "Report number",
      dataIndex: "report_number",
      key: "report_number",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Season",
      dataIndex: "season",
      key: "season",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Action",
      key: "action",
      render: (_, sighting) => (
        <Space size="middle">
          <Link to={"/sightings/" + sighting.index}>
            Read report {sighting.report_number}
          </Link>
        </Space>
      ),
    },
  ];

  let manipulatedSightings = sightings.map((sighting, index) => {
    return {
      index: index,
      report_number: sighting.REPORT_NUMBER,
      year: sighting.YEAR,
      season: sighting.SEASON,
      state: sighting.STATE,
    };
  });
  let yearsArray = manipulatedSightings.map((a) => {
    return a.year;
  });
  let sortedUniqueYears = [...new Set(yearsArray.sort())].slice(0, -1);

  return (
    <>
      <Table dataSource={manipulatedSightings} columns={columns} />
      <SelectYearForm years={sortedUniqueYears} />
    </>
  );
}
