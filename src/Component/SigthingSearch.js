import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function SightingSearch() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [direction, setDirection] = useState("ascending");

  return (
    <div className="App-header">
      Data Search
      <Link to="/" className="home-button">
        <button>Go Home</button>
      </Link>
      <select
        value={filter}
        onChange={(e) => {
          setSort("");
          setFilter(e.target.value);
        }}
      >
        <option value="">Index</option>
        <option value="date">Date</option>
        <option value="location">location</option>
      </select>
      <input
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Search ${filter ? filter : "index"}`}
      />
      <label>Sort by:</label>
      <select
        value={sort}
        onChange={(e) => {
          if (filter === "date") {
            setFilter("");
          }
          setSort(e.target.value);
        }}
        disabled={!filter || filter === "date"}
      >
        <option value="">No need</option>
        <option value="date">Date</option>
      </select>
      <select
        value={direction}
        onChange={(e) => setDirection(e.target.value)}
        disabled={!sort}
      >
        <option value="ascending">Ascending</option>
        <option value="decending">Decending</option>
      </select>
      <Link
        to={`/sightingSearch/${filter}${filter && "/"}${input.toLowerCase()}${
          sort && filter && `/sort/${sort}/${direction}`
        }
        `}
      >
        <button>Search by {filter ? filter : "index"}</button>
      </Link>
      <Outlet />
    </div>
  );
}
