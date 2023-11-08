import React, { Component } from "react";
import "./App.css";
import { BACKEND_URL } from "./Constants";
import { Link, Outlet } from "react-router-dom";

class IndexRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: [],
    };
  }

  componentDidMount() {
    const url = `${BACKEND_URL}/sightings/${this.props.index}`;
    fetch(url) // Send GET request to '/sightings' endpoint
      .then((response) => response.json())
      .then((data) => {
        this.setState({ sightings: data }); // Update the 'sightings' state with the fetched data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  render() {
    const sightings = this.state.sightings;
    //const index = this.props.index;
    return (
      <div>
        <h2>Sighting index: {sightings.id}</h2>
        {sightings ? (
          <div>
            <h4>Date and time: {sightings.date}</h4>

            <h4>Location: </h4>
            {sightings.location}
            <h4>Categories:</h4>
            {sightings.categories && sightings.categories.length > 0 ? (
            <ul>
              {sightings.categories.map((category) => (
                <li key={category.id}>{category.category_name}</li>
              ))}
            </ul>
          ) : (
            <p>No categories associated</p>
          )}
            <h4>Details: </h4>
            {sightings.notes ? <p>{sightings.notes}</p> : <p>None provided</p>}
          </div>
        ) : null}
        <Link to="comments" style={{ textDecoration: "none" }}>
          <button className="back-button">View comments</button>
        </Link>
        <Link to="comments/add" style={{ textDecoration: "none" }}>
          <button className="back-button">Add comment</button>
        </Link>
        <Link to="" style={{ textDecoration: "none" }}>
          <button className="back-button">Hide comments</button>
        </Link>
        <Outlet />
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="back-button">Home</button>
        </Link>
        
      </div>
    );
  }
}

export default IndexRender;
