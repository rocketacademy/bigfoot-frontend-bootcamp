import React from 'react';
import Card from 'react-bootstrap/Card';

const SightingPreview = (props) => {
  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>
          {props.data.MONTH !== undefined
            ? `${props.data.YEAR} ${props.data.SEASON} ${props.data.MONTH}`
            : `${props.data.YEAR} ${props.data.SEASON} `}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SightingPreview;
