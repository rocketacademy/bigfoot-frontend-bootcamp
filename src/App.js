import React from "react";
import bigfoot from "./bigfoot.png";
import "./App.css";
// import SightingsList from "./Components/SightingsList";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AppWrapper() {
  const navigate = useNavigate();

  return <App navigate={navigate} />;
}

class App extends React.Component {
  handleClick = () => {
    const navigate = this.props.navigate;
    navigate("/sightings");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bigfoot sightings</h1>
          <img src={bigfoot} className="bigfoot" alt="bigfoot" width={400} />
          <h4>Click the button to view Bigfoot sightings</h4>
          <Button
            variant="standard"
            sx={{ backgroundColor: "purple" }}
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
