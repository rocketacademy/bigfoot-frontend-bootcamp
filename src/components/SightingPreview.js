import React from "react";

const SightingPreview = (props) => {
  return (
    <div>{`${props.data.YEAR} ${props.data.SEASON} ${props.data.MONTH}`}</div>
  );
};

export default SightingPreview;
