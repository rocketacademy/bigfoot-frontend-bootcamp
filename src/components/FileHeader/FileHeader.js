import "../../App.css";
import "./FileHeader.css";

const FileHeader = (data) => {
  const incomingData = data.data;
  return (
    <div className="sightings-info">
      <div className="sightings-info-left">
        <h6>REPORT NO: {incomingData.id}</h6>
        <h6>LOCATION: {incomingData.location}</h6>
      </div>
      <div className="sightings-info-right">
        <h6>
          {incomingData.month && incomingData.month + ", "}
          {incomingData.year}
        </h6>
        <h6>SEASON: {incomingData.season}</h6>
      </div>
    </div>
  );
};

export default FileHeader;
