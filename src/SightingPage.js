import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@mui/material";

// const Sighting = () => {
//   const [sightingIndex, setSightingIndex] = useState();
//   const [sighting, setSighting] = useState();

//   useEffect(() => {
//     // If there is a sightingIndex, retrieve the sighting data
//     if (sightingIndex) {
//       axios
//         .get(`http://localhost:3001/sightings/${sightingIndex}`)
//         .then((response) => {
//           setSighting(response.data);
//         });
//     }
//     // Only run this effect on change to sightingIndex
//   }, [sightingIndex]);

//   // Update sighting index in state if needed to trigger data retrieval
//   const params = useParams();
//   if (sightingIndex !== params.sightingIndex) {
//     setSightingIndex(params.sightingIndex);
//   }

//   // // Store a new JSX element for each property in sighting details
//   const sightingDetails = [];
//   if (sighting) {
//     for (const key in sighting) {
//       sightingDetails.push(
//         <Card.Text key={key}>{`${key}: ${sighting[key]}`}</Card.Text>
//       );
//     }
//   }

//   return (
//     <div>
//       <Link to="/">Return home</Link>
//       <Card bg="light">
//         <Card.Body>
//           <Card.Title>
//             {sighting &&
//               `${sighting.YEAR} ${sighting.SEASON} ${sighting.MONTH}`}
//           </Card.Title>
//           {sightingDetails}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default Sighting;

function SightingPage() {
  const [sighting, setSighting] = useState({});
  let { sightingId } = useParams();

  useEffect(() => {
    const fetchSightingPage = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/sightings/${sightingId}`
        );
        const sighting = data.data;
        setSighting(sighting);
        console.log(sighting);
      } catch (error) {
        console.error("Error fetching sighting:", error);
      }
    };

    fetchSightingPage();
  }, []);

  return (
    <div>
      <Link to="/">Return home</Link>
      <Card bg="light">
        <Card.Body>
          <Card.Title>
            {sighting &&
              `${sighting.YEAR} ${sighting.SEASON} ${sighting.MONTH}`}
          </Card.Title>
          {sighting}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SightingPage;
