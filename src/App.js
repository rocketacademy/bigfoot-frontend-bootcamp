import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";

const INDEX = 2;
const url = `http://localhost:3000/sightings/${INDEX}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: [],
    };
  }

  componentDidMount() {
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

    console.log(sightings);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {sightings ? (
            <div>
              <p>
                Year: {sightings.YEAR}+{sightings.SEASON}
              </p>

              <p>
                Location: {sightings.STATE}+{sightings.COUNTY}
              </p>

              <p>Location Details: {sightings.LOCATION_DETAILS}</p>
            </div>
          ) : null}
        </header>
      </div>
    );
  }
}

export default App;
