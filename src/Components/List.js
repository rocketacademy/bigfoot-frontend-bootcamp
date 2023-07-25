import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import { useSearchParams } from "react-router-dom";

export default function List() {
  const [sightings, setSightings] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const year = searchParams.get("year");
  const sort = searchParams.get("sort");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/sightings`, {
        params: { year: year, sort: sort },
      });
      console.log(data);
      setSightings(data);
    };

    fetchData();
  }, [year, sort]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ year: userInput });
  };

  return (
    <div>
      <Link to="/new">Click Here to Add New Sighting</Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={({ target }) => setUserInput(target.value)}
          placeholder="Filter by year"
        />
      </form>

      <button
        onClick={() =>
          setSearchParams({ year: year === null ? "" : year, sort: "asc" })
        }
      >
        Sort by asc year
      </button>
      <button
        onClick={() =>
          setSearchParams({ year: year === null ? "" : year, sort: "desc" })
        }
      >
        Sort by dsc year
      </button>

      {sightings.map((sighting) => (
        <ul key={sighting.id}>
          <Link to={`/sightings/${sighting.id}`}>
            <li>Sighting {sighting.id}</li> 
          </Link>
          {/**(sighting.date).toLocaleString() alone won't work as typeof sighting.date === string. toLocalString() only works on date object */}
          <li>Date: {new Date(sighting.date).toLocaleString()}</li>
          <li>Location: {sighting.location}</li>

          {sighting.categories.length > 0 && (
            <li>
              Categories:{" "}
              {sighting.categories.map((category) => category.name).join(", ")}
            </li>
          )}
        </ul>
      ))}
    </div>
  );
}
