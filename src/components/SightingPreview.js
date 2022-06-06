import React from "react";
import Card from "react-bootstrap/Card";

const SightingPreview = (props) => {
  const categoryNames = props.data.Categories.map((category) => category.name);
  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>
          {`${new Date(props.data.date).toDateString()} 
          | ${props.data.location}`}
        </Card.Title>
        {categoryNames.length > 0 && (
          <Card.Text>Categories: {categoryNames.join(", ")}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default SightingPreview;
