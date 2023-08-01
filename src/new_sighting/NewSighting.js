import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { BACKEND_URL } from "../Constants";
//import { Outlet } from "react-router-dom";

export default class NewSighting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sighting: { date: "", location: "", notes: "No details provided." },
      successMessage: "",
      index: "",
    };
  }

  sendPostRequest() {
    const url = `${BACKEND_URL}/sightings`;
    const { sighting } = this.state;
    if (!sighting.location) {
      alert("Location cannot be empty");
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type of the request
          // Add any other headers if required
        },
        body: JSON.stringify(sighting), // Convert your request data to JSON string
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          // Handle the response data (if any)

          console.log("Response Data:", data);

          this.setState({
            sighting: { date: "", location: "", notes: "No details provided." },
            successMessage: "Successfully submitted the sighting!",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  render() {
    const { sighting, successMessage } = this.state;
    const { location, notes } = sighting;
    const curr_date = this.getCurrentDateTime();
    return (
      <div>
        <label for="sighting-time">
          <h3>Please input sighting date:</h3>
        </label>

        <input
          type="datetime-local"
          id="sighting-time"
          name="sighting-time"
          value={curr_date}
          min="1900-01-01T00:00"
          max={curr_date}
          onChange={(e) =>
            this.setState({
              sighting: { ...this.state.sighting, date: e.target.value },
            })
          }
        ></input>
        <br />
        <h3>Please input sighting location:</h3>
        {/* <label>Index:</label> */}
        <input
          type="text"
          value={location}
          onChange={(e) =>
            this.setState({
              sighting: { ...this.state.sighting, location: e.target.value },
            })
          }
          placeholder="Location Here"
        />
        <br />
        <h3>Please notes of sighting details:</h3>
        {/* <label>Index:</label> */}
        <input
          type="text"
          value={notes}
          onChange={(e) =>
            this.setState({
              sighting: { ...this.state.sighting, notes: e.target.value },
            })
          }
          placeholder="Notes Here"
        />
        <br />
        <button onClick={() => this.sendPostRequest()}>Submit</button>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <br />
        <Link to="/" style={{ textDecoration: "none" }}>
          <button>Back</button>
        </Link>
      </div>
    );
  }
}
