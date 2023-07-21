import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { BACKEND_URL } from "./Constants";

class YearFiltered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: [],
    };
  }

  componentDidMount() {
    const url = `${BACKEND_URL}/sightings/year/${this.props.year}`;
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
    
    //console.log(sightings);
    return (
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link><Link to="/year" style={{ textDecoration: "none" }}>
          Back
        </Link>
        <h2>Sightings in years {this.props.year}</h2>
        {sightings ? (
          <div>
            {sightings.map((sighting, index) => (
              <div key={index + 1}>
                <h4>
                  Sighting {index+1}: {sighting.YEAR} {sighting.SEASON}
                </h4>

                <p>Location: {sighting.STATE}</p>

                <p>Location Details:</p> {sighting.LOCATION_DETAILS ? <div>{sighting.LOCATION_DETAILS}</div> : <div>None provided</div>}
                <br />
              </div>
            ))}
          </div>
        ) : null}
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link><Link to="/year" style={{ textDecoration: "none" }}>
          Back
        </Link>
      </div>
    );
  }
}

export default YearFiltered;
