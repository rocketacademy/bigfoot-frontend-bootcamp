import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Outlet />
        
      </div>
    );
  }
}

export default App;
