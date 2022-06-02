import React from "react";
import Card from "react-bootstrap/Card";

const SightingPreview = (props) => {
  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>
          {`${new Date(props.data.date).toDateString()} 
          | ${props.data.location}`}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SightingPreview;
