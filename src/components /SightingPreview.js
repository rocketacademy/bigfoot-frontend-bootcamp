import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverURL } from "../ServerURL";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "antd";
import "../App.css";

const SightingPreview = () => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios.get(serverURL).then((response) => setSightings(response.data));
  }, []);

  const sighting = sightings.map((sighting) => (
    <Link to={`/sightings/${sighting.id}`}>
      <div className="site-card-wrapper">
        <Row gutter={15}>
          <Col span={8}>
            <Card
              title={`Sighting No.: ${sighting.id}`}
              style={{
                width: 300,
                margin: 30,
                underline: false,
              }}
            >
              <p>Date: {sighting.date}</p>
              <p>Location: {sighting.location}</p>
            </Card>
          </Col>
        </Row>
      </div>
    </Link>
  ));

  return (
    <div>
      <button type="button">
        <Link to="/new">Record a New Sighting!</Link>
      </button>
      <div className="cards">{sighting}</div>
    </div>
  );
};

export default SightingPreview;
