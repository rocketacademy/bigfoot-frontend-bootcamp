import React from "react";
import Card from "react-bootstrap/Card";

class SightingPreview extends React.Component {
  render() {
    return (
      <Card bg="dark">
        <Card.Body>
          <Card.Title>{`${new Date(this.props.data.date).toDateString()} | ${
            this.props.data.location
          }`}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default SightingPreview;
