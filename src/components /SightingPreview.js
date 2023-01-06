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

  const sighting = sightings.map((sighting, index) => (
    <Link to={`/sightings/${index}`}>
      <div className="site-card-wrapper">
        <Row gutter={15}>
          <Col span={8}>
            <Card
              title={`Sighting No.: ${index}`}
              style={{
                width: 300,
                margin: 30, 
              }} 
            >
              <p>Year: {sighting.YEAR}</p>
              <p>Season: {sighting.SEASON}</p>
              <p>
                Date: {sighting.DATE} {sighting.MONTH}
              </p>
              <p>
                Location: {sighting.STATE} {sighting.COUNTY}
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </Link>
  ));

  return <div className="cards">{sighting}</div>;
};

export default SightingPreview;
