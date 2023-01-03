import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { List, Button } from "antd";
import { useNavigate } from "react-router-dom";

export function SightingReport() {
  let [sightingDetails, setSightingDetails] = useState({});
  let { sightingIndex } = useParams();
  let [reportNumber, setReportNumber] = useState("");
  let [dataToDisplay, setDataToDisplay] = useState([]);
  const navigate = useNavigate();
  console.log(sightingIndex);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings/${sightingIndex}`)
      .then(({ data: details }) => {
        console.log(details);
        setSightingDetails(details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sightingIndex]);

  useEffect(() => {
    let {
      REPORT_NUMBER,
      YEAR,
      SEASON,
      STATE,
      COUNTY,
      LOCATION_DETAILS,
      OBSERVED,
      OTHER_WITNESSES,
      TIME_AND_CONDITIONS,
      REPORT_CLASS,
    } = sightingDetails;

    setReportNumber(REPORT_NUMBER);
    setDataToDisplay([
      `Report class: ${REPORT_CLASS}`,
      `Year: ${YEAR}`,
      `Season: ${SEASON}`,
      `State: ${STATE}`,
      `County: ${COUNTY}`,
      `Location details: ${LOCATION_DETAILS}`,
      `Time and Conditions: ${TIME_AND_CONDITIONS}`,
      `Observed: ${OBSERVED}`,
      `Other witnesses: ${OTHER_WITNESSES}`,
    ]);
  }, [sightingDetails]);

  return (
    <>
      <List
        size="large"
        header={<div>Report Number:{reportNumber}</div>}
        bordered
        dataSource={dataToDisplay}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      <Button
        type="primary"
        block
        onClick={() => {
          navigate("/sightings");
        }}
      >
        Back
      </Button>
    </>
  );
}
