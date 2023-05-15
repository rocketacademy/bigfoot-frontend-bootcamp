import { useNavigate, useParams } from "react-router-dom";

const Sighting = (data) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = (e) => {
    const target = e.target.id;
    if (target === "back") {
      navigate("/");
    } else if (target === "previous") {
      const targetId = Number(id) - 1;
      navigate("/sightings/" + targetId);
    } else if (target === "next") {
      const targetId = Number(id) + 1;
      navigate("/sightings/" + targetId);
    }
  };

  if (data.data === null) {
    return <p>Loading</p>;
  } else {
    const sightingData = data.data[id];
    console.log(sightingData);
    return (
      <div id="sightings">
        <div className="sightings-header">
          <h5>Bigfoot Casefiles</h5>
          <button onClick={handleClick} id="back">
            Home 🏠
          </button>
        </div>
        <div className="sightings-content">
          <div className="sightings-info">
            <div className="sightings-info-left">
              <h6>REPORT NO: {sightingData.REPORT_NUMBER}</h6>
              <h6>TYPE: {sightingData.REPORT_CLASS}</h6>
              <h6>LOCATION: {sightingData.STATE}</h6>
            </div>
            <div className="sightings-info-right">
              <h6>YEAR: {sightingData.YEAR}</h6>
              <h6>MONTH: {sightingData.MONTH}</h6>
              <h6>DATE: {sightingData.DATE}</h6>
            </div>
          </div>
          <br />
          <p>{sightingData.OBSERVED}</p>
        </div>
        <div className="sightings-navigate">
          {id > 0 && (
            <button onClick={handleClick} id="previous">
              ⇦ Previous Case
            </button>
          )}
          {id < data.data.length - 1 && (
            <button onClick={handleClick} id="next">
              Next Case ⇨
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default Sighting;
