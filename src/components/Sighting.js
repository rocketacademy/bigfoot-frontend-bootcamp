import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const Sighting = ({ sightingIndex }) => {
  const [sighting, setSighting] = useState({});

  useEffect(() => {
    console.log(sightingIndex);
    axios.get(`http://localhost:3000/${sightingIndex}`).then((response) => {
      setSighting(response.data);
    });
  }, [sighting, sightingIndex]);

  const sightingDetails = [];
  for (const key in sighting) {
    sightingDetails.push(<p>{`${key}: ${sighting[key]}`}</p>);
  }

  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>
          {`${this.props.data.YEAR} ${this.props.data.SEASON} ${this.props.data.MONTH}`}
        </Card.Title>
        <Card.Text>{sightingDetails}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Sighting;
