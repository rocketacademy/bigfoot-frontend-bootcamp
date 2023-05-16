import "../../App.css";
import "./FileHeader.css";

const FileHeader = (data) => {
  const incomingData = data.data;
  return (
    <div className="sightings-info">
      <div className="sightings-info-left">
        <h6>REPORT NO: {incomingData.REPORT_NUMBER}</h6>
        <h6>TYPE: {incomingData.REPORT_CLASS}</h6>
        <h6>LOCATION: {incomingData.STATE}</h6>
      </div>
      <div className="sightings-info-right">
        <h6>
          {incomingData.MONTH && incomingData.MONTH + ", "}
          {incomingData.YEAR}
        </h6>
        <h6>SEASON: {incomingData.SEASON}</h6>
      </div>
    </div>
  );
};

export default FileHeader;
