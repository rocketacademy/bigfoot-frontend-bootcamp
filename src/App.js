import React from "react";
import bigfoot from "./bigfoot.png";
import "./App.css";
// import SightingsList from "./Components/SightingsList";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

function AppWrapper() {
  const navigate = useNavigate();

  return <App navigate={navigate} />;
}

class App extends React.Component {
  handleClick = () => {
    const navigate = this.props.navigate;
    navigate("/sightings");
  };

  linkStyle = {
    // margin: "1rem",
    textDecoration: "none",
    color: "white",
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bigfoot sightings</h1>
          <img src={bigfoot} className="bigfoot" alt="bigfoot" width={400} />
          <Link to={"/sightings"} style={this.linkStyle}>
            <h4>Click here to view Bigfoot sightings</h4>
          </Link>
          <Button
            variant="standard"
            sx={{ backgroundColor: "orange" }}
            onClick={this.handleClick}
          >
            View sightings
          </Button>

          {/* <SightingsList /> */}
        </header>
      </div>
    );
  }
}

// export default App;

export default AppWrapper;
