import React from "react";
import Homepage from "./components/Homepage";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h1>Bigfoot Sightings</h1>
          </div>
          <Homepage />
        </header>
      </div>
    );
  }
}

export default App;
