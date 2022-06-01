import React from "react";
import Card from "react-bootstrap/Card";

class SightingPreview extends React.Component {
  render() {
    return (
      <Card bg="dark">
        <Card.Body>
          <Card.Title>
            {`${this.props.data.YEAR} ${this.props.data.SEASON} ${this.props.data.MONTH}`}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default SightingPreview;
