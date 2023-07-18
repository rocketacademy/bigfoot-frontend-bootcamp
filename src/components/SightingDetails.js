import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export default function SightingDetails({ show, onHide, reportNumber }) {
  // const { reportNumber } = useParams();
  const [sighting, setSighting] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/sightings/${reportNumber}`)
      .then((response) => response.json())
      .then((data) => setSighting(data))
      .then(console.log(JSON.stringify(sighting)));
  }, [reportNumber]);

  useEffect(() => {
    console.log(`Fetching sighting with report number: ${reportNumber}`);
  }, [reportNumber]);

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        style={{
          maxHeight: "75vh",
          // overflowY: "auto",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Add this line
          overflow: "hidden",
        }}
      >
        {/* <Link to={"/"}> */}
        <Button
          variant="secondary"
          onClick={onHide}
          style={{
            margin: "10px",
            position: "sticky",
            zIndex: 1,
          }}
        >
          Go back
        </Button>
        {/* </Link> */}
        <div
          style={{
            margin: "10px",
            marginTop: "0px",
            maxHeight: "65vh",
            overflowY: "auto",
          }}
        >
          {sighting !== null ? <p>{sighting.OBSERVED}</p> : null}
        </div>
      </Modal>
    </div>
  );
}
