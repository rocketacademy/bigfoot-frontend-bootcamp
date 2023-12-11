import "./App.css";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Big Foot Sighting Data</h1>
        <Link to="/sightingList">
          <button>Show all Data</button>
        </Link>
        <Link to="/sightingSearch">
          <button>Search Data</button>
        </Link>
      </header>
    </div>
  );
}
