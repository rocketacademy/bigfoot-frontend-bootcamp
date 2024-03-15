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
import CommentForm from "./CommentForm";
import SightingForm from "./SightingForm";

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
                  <SightingForm
                    displaySightings={displaySightings}
                  ></SightingForm>
                  {sightings.map((sighting) => (
                    <Link key={sighting.id} to={`/sightings/${sighting.id}`}>
                      {sighting.id}: {sighting.createdAt}
                      <br></br>
                    </Link>
                  ))}
                </div>
              }
            />
            {sightings.map((sighting) => (
              <Route
                key={sighting.id}
                path={`/sightings/:sightingId`}
                element={<Sighting />}
              />
            ))}
          </Routes>
        </header>
      </div>
    </Router>
  );
};

const Sighting = () => {
  const { sightingId } = useParams(); // Fix: Change 'sightingIndex' to 'sightingId'
  const [sighting, setSighting] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  console.log(sightingId);
  useEffect(() => {
    const fetchSighting = async () => {
      if (!sightingId) return;
      try {
        const res = await axios.get(
          `http://localhost:3000/sightings/${sightingId}/`
        );
        setSighting(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSighting();
  }, [sightingId]);

  const refreshComments = async () => {
    const res = await axios.get(
      `http://localhost:3000/sightings/${sightingId}/comments`
    );
    setComments(res.data);
    console.log(res.data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const Categories = ({ categories }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/sightings/${sightingId}/`
          );
          console.log(res.data);
          setSelectedCategories(
            res.data.filter((category) => categories.includes(category.id))
          );
        } catch (error) {
          console.error(error);
        }
      };
    });
  };

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
          <p>
            Comment:{" "}
            {comments.map((comment, index) => (
              <p key={index}>{comment.content}</p>
            ))}
          </p>
          <p>
            Categories:{" "}
            {sighting.categories.map((category, index) => (
              <p key={index}>{category.name}</p>
            ))}
          </p>
        </div>
      )}
      <CommentForm sightingId={sightingId} refreshComments={refreshComments} />
      <Link to="/">Back</Link>
    </div>
  );
};

export default App;
