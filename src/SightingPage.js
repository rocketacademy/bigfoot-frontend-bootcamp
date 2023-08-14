// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { BACKEND_URL } from "./constants";
// import { Card, Typography } from "@mui/material";

// function SightingPage() {
//   const [sighting, setSighting] = useState();
//   let { id } = useParams();

//   useEffect(() => {
//     const fetchSightingPage = async () => {
//       try {
//         const data = await axios.get(`${BACKEND_URL}/sightings/${id}`);
//         console.log("data:", data.data);
//         const sighting = data.data;
//         setSighting(sighting);
//       } catch (error) {
//         console.error("Error fetching sighting:", error);
//       }
//     };
//     fetchSightingPage();
//   }, []);

//   return (
//     <div>
//       <Link to="/">Return home</Link>
//       <Card bg="light">
//         <Typography gutterBottom variant="h2">
//           Sighting #{sighting.id}
//         </Typography>
//         <Typography variant="h5">{sighting.date}</Typography>
//         <Typography variant="h5">{sighting.location}</Typography>
//         <Typography variant="body2" color="text.secondary">
//           {sighting.notes}
//         </Typography>
//       </Card>
//       <p>Submit a comment here</p>
//     </div>
//   );
// }

// export default SightingPage;
