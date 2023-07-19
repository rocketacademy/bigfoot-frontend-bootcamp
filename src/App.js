import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./App.css";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const BACKEND_URL = "http://localhost:2999";

const AllSightingsPage = () => {
  const [AllSightings, setAllSightings] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setAllSightings(response.data);
    });
  }, []);

  return (
    <div>
      {AllSightings.map((sighting, index) => (
        <Link to={`/sightings/${index}`} key={index}>
          <Card bg="dark" border="info" text="light">
            <Card.Body>
              <Card.Title>
                {`Sighting Report Number: ${sighting.REPORT_NUMBER}`}
              </Card.Title>
              <Card.Text className="small-text">
                Year: {sighting.YEAR}
              </Card.Text>
              <Card.Text className="small-text">
                Season: {sighting.SEASON}
              </Card.Text>
              <Card.Text className="small-text">
                County: {sighting.COUNTY}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </div>
  );
};

const Sighting = () => {
  const params = useParams();
  const [SelSighting, setSelSighting] = useState(null);

  useEffect(() => {
    if (params.sightingIndex) {
      axios
        .get(`${BACKEND_URL}/sightings/${params.sightingIndex}`)
        .then((response) => {
          setSelSighting(response.data);
        });
    }
  }, [params.sightingIndex]);

  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <br />
      {SelSighting ? (
        <div className="div-container">
          <Card bg="dark">
            <Card.Body>
              <Card.Title>
                {`${SelSighting.YEAR} ${SelSighting.SEASON}  Report: ${SelSighting.REPORT_NUMBER}`}
              </Card.Title>
              <Card.Text className="small-text">
                Year: {SelSighting.YEAR}
              </Card.Text>
              <Card.Text className="small-text">
                Season: {SelSighting.SEASON}
              </Card.Text>
              <Card.Text className="small-text">
                County: {SelSighting.COUNTY}
              </Card.Text>
              <Card.Text className="small-text">
                Location Details: {SelSighting.LOCATION_DETAILS}
              </Card.Text>
              <Card.Text className="small-text">
                Observed: {SelSighting.OBSERVED}
              </Card.Text>
              <Card.Text className="small-text">
                Other Witnesses: {SelSighting.OTHER_WITNESSES}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllSightingsPage />} />
            <Route path="sightings/:sightingIndex" element={<Sighting />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}
