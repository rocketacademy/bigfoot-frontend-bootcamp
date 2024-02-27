import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import logo from "../logo.png";
import "./App.css";
import axios from "axios";
import { Form } from "react-bootstrap";

const Sighting = () => {
  let { sightingIndex } = useParams();
  const [sighting, setSighting] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSighting = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/sightings/${sightingIndex}/`
        );
        setSighting(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSighting();
  }, [sightingIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {sighting && (
        <div>
          <p>
            Location: {sighting.location} <br></br>
          </p>
          <p>
            Note: {sighting.notes} <br></br>
          </p>
        </div>
      )}
      {/* <Form>
        <Form.Control type="text" name="location">
          Hello
        </Form.Control>
      </Form> */}
      {/* {sighting
          .filter((item) => item.sighting_id === parseInt(sightingIndex))
          .map((item, index) => (
            <p key={index}>Comment: {item.content}</p>
          ))} */}
      <Link to="/">Back</Link>
    </div>
  );
};

const App = () => {
  const [sightings, setSightings] = useState([]);

  const displaySightings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/sightings/");
      console.log(res.data);
      setSightings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    displaySightings();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {sightings.map((sighting, index) => (
                    <Link key={index} to={`/sightings/${index}`}>
                      {sighting.id}: {sighting.createdAt}
                      <br></br>
                    </Link>
                  ))}
                </div>
              }
            />
            <Route path="/sightings/:sightingIndex" element={<Sighting />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;
