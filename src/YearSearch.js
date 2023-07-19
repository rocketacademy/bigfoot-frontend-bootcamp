import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./App.css";
import { Outlet } from "react-router-dom";
//import { BACKEND_URL } from "./Constants";


class YearSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
    }

    render(){
        return <Outlet />
    }
}

export default YearSearch;