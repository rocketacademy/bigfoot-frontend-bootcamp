import { useEffect, useState } from "react";
import "./Composer.css";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

const Composer = ({ setComposer, setData }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (
      month.toLowerCase() === "march" ||
      month.toLowerCase() === "april" ||
      month.toLowerCase() === "may"
    ) {
      setSeason("Spring");
    } else if (
      month.toLowerCase() === "june" ||
      month.toLowerCase() === "july" ||
      month.toLowerCase() === "august"
    ) {
      setSeason("Summer");
    } else if (
      month.toLowerCase() === "september" ||
      month.toLowerCase() === "october" ||
      month.toLowerCase() === "november"
    ) {
      setSeason("Fall");
    } else if (
      month.toLowerCase() === "december" ||
      month.toLowerCase() === "january" ||
      month.toLowerCase() === "february"
    ) {
      setSeason("Winter");
    }
  }, [month]);

  const handleChange = (e) => {
    const id = e.target.id;
    if (id === "month") {
      setMonth(e.target.value);
    } else if (id === "year") {
      setYear(e.target.value);
    } else if (id === "location") {
      setLocation(e.target.value);
    } else if (id === "season") {
      setSeason(e.target.value);
    } else if (id === "notes") {
      setNotes(e.target.value);
    }
  };

  const handleClick = () => {
    setComposer(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(BACKEND_URL + "/sightings", {
      month: month,
      year: year,
      location: location,
      season: season,
      notes: notes,
    });
    setData((prevData) => [...prevData, result.data.sighting]);
    setComposer(false);
  };

  return (
    <div id="composer">
      <form id="composer-form">
        <div id="composer-form-header">
          <h3>Add a Sighting!</h3>
          <button onClick={handleClick}>Cancel</button>
        </div>
        <input
          type="text"
          value={month}
          id="month"
          onChange={handleChange}
          placeholder="Enter month"
          autoComplete="off"
        />
        <input
          type="text"
          value={year}
          id="year"
          onChange={handleChange}
          placeholder="Enter year"
          autoComplete="off"
        />
        <input
          type="text"
          value={location}
          id="location"
          onChange={handleChange}
          placeholder="Enter location"
          autoComplete="off"
        />
        <textarea
          value={notes}
          id="notes"
          onChange={handleChange}
          placeholder="Enter notes"
          autoComplete="off"
        />
        <button onClick={handleSubmit} id="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Composer;
