import React, { Component } from "react";
import "./App.css";
import { BACKEND_URL } from "./Constants";
import { Link } from "react-router-dom";

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
    console.log(parseInt(sightings.YEAR))
    return (
      <div>
        <h2>Sighting index: {this.props.index}</h2>
        {sightings ? (
          <div>
            <p>
              Year: {sightings.YEAR} {sightings.SEASON}
            </p>

            <p>
              Location: {sightings.STATE} 
            </p>

            <p>Location Details: </p>{sightings.LOCATION_DETAILS ? <p>{sightings.LOCATION_DETAILS}</p> : <p>None provided</p>}
          </div>
        ) : null}
        <Link to="/" style={{ textDecoration: "none" }}>
          Back
        </Link>
      </div>
    );
  }
}

export default IndexRender;
