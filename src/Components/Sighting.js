import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";
import EditSightingForm from "./EditSightingForm";

function Sighting() {
  const [sighting, setSighting] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings/${id}`)
      .then((res) => {
        setSighting(res.data);
        console.log(sighting);
      })
      .catch((error) => {
        console.log("Error fetching sighting:", error);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    navigate(`/sightings/${id}/edit`);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    navigate(`/sightings/${id}`);
  };

  const handleUpdateSighting = async (updatedSighting) => {
    try {
      await axios.put(`${BACKEND_URL}/sightings/${id}`, updatedSighting);
      setSighting(updatedSighting);
      setIsEditing(false);
      navigate(`/sightings/${id}`);
    } catch (error) {
      console.log("Error updating sighting:", error);
    }
  };

  const renderSighting = () => {
    return (
      <div className="sighting-body">
        <div>Date: {sighting.date}</div>
        <div>Location: {sighting.location}</div>
        <div>{sighting.notes}</div>
      </div>
    );
  };

  return (
    <div className="sighting-ctn App">
      <Navbar />
      {!isEditing ? (
        <div className="sighting-header">
          Sighting Summary <button onClick={handleEditClick}>✎</button>
        </div>
      ) : (
        <div className="sighting-header">
          <button onClick={handleCancelEdit}>←</button> Update Sighting
        </div>
      )}
      {!isEditing ? (
        renderSighting()
      ) : (
        <EditSightingForm
          sighting={sighting}
          onUpdateSighting={handleUpdateSighting}
        />
      )}
    </div>
  );
}

export default Sighting;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { BACKEND_URL } from "../constants";
// import Navbar from "./Navbar";

// function Sighting() {
//   const [sighting, setSighting] = useState();
//   const [sightingIndex, setSightingIndex] = useState();

//   const params = useParams();

//   useEffect(() => {
//     if (sightingIndex) {
//       axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`).then((res) => {
//         setSighting(res.data);
//       });
//     }
//   }, [sightingIndex]);

//   if (sightingIndex !== params.sightingIndex) {
//     setSightingIndex(params.sightingIndex);
//   }

//   const sightingInfo = [];
//   if (sighting) {
//     for (const key in sighting) {
//       sightingInfo.push(<div key={key}>{`${key}: ${sighting[key]}`}</div>);
//     }
//   }

//   return (
//     <div className="sighting-ctn App">
//       <Navbar />
//       <div className="sighting-header">
//         {sighting && `${sighting.YEAR} ${sighting.SEASON} ${sighting.MONTH}`}
//       </div>
//       <div className="sighting-body">{sightingInfo}</div>
//     </div>
//   );
// }

// export default Sighting;
