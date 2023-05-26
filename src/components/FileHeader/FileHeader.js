import "../../App.css";
import "./FileHeader.css";
import { capitalise } from "../../utils";

const FileHeader = (data) => {
  const incomingData = data.data;
  let categories = "";
  if (incomingData.categories) {
    incomingData.categories.map(
      (category) => (categories += `${capitalise(category.name)}, `)
    );
    categories = categories.substring(0, categories.length - 2);
  }
  return (
    <div className="sightings-info">
      <div className="sightings-info-left">
        <h6>REPORT NO: {incomingData.id}</h6>
        <h6>LOCATION: {incomingData.location}</h6>
        {categories !== "" && <h6>WEATHER: {categories}</h6>}
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
