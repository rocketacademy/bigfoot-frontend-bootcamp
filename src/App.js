import React, { useState, useEffect } from "react";
// import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

const App = () => {
  const [sighting, setSightings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/sightings")
      .then((response) => {
        setSightings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Reports of Sightings</h1>

      {sighting.map((sighting, index) => (
        <Card key={index} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Report number: {sighting.REPORT_NUMBER} State: {sighting.STATE}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {sighting.COUNTY}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sighting.LOCATION_DETAILS}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sighting.OBSERVED}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//         </header>
//       </div>
//     );
//   }
// }

export default App;

// render all sightings on app.js
//  use these "YEAR": "Early 1990's",  "SEASON": "Fall",  "REPORT_NUMBER": "1261",
// use state
