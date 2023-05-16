import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const Sighting = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios.get(BACKEND_URL + "sightings/" + id);
      setData(getData.data);
    };
    fetchData();
  }, [id]);

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

  if (data === null) {
    return <p>Loading</p>;
  } else {
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
              <h6>REPORT NO: {data.REPORT_NUMBER}</h6>
              <h6>TYPE: {data.REPORT_CLASS}</h6>
              <h6>LOCATION: {data.STATE}</h6>
            </div>
            <div className="sightings-info-right">
              <h6>
                {data.MONTH && data.MONTH + ", "}
                {data.YEAR}
              </h6>
              <h6>SEASON: {data.SEASON}</h6>
            </div>
          </div>
          <br />
          <p>{data.OBSERVED}</p>
        </div>
        <div className="sightings-navigate">
          {id > 0 && (
            <button onClick={handleClick} id="previous">
              ⇦ Previous Case
            </button>
          )}
          {id < 466 && (
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
