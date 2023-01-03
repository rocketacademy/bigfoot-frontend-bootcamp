import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

export function Sightings() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings`)
      .then(({ data: sightings }) => {
        setSightings(sightings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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

  return (
    <>
      <Table dataSource={manipulatedSightings} columns={columns} />;
    </>
  );
}
