import { Link } from "react-router-dom";
import { useState } from "react";
import { BACKEND_URL } from "../constants";
import "../App.css";

const NewSighting = () => {
  const [inputFields, setInputfields] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const handleChange = (e, field) => {
    let newFields = inputFields;
    newFields[field] = e.target.value;
    setInputfields({ ...newFields });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addNewSighting = async () => {
      await fetch(BACKEND_URL + "/sightings/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFields),
      });
    };
    addNewSighting();
    //reset input fields
    setInputfields({
      date: "",
      location: "",
      notes: "",
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="top-left">
          Back
        </Link>
        <h1>Write your new sighting below</h1>
        <form className="width-100 flex-center">
          <label className="block">Date (MM-DD-YYYY): </label>
          <input
            className="block"
            type="text"
            value={inputFields.date}
            onChange={(e) => handleChange(e, "date")}
          ></input>
          <label className="block">location: </label>
          <input
            className="block"
            type="text"
            value={inputFields.location}
            onChange={(e) => handleChange(e, "location")}
          ></input>
          <label className="block">Notes: </label>
          <textarea
            className="block large-textbox"
            type="text"
            value={inputFields.notes}
            onChange={(e) => handleChange(e, "notes")}
          ></textarea>
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>
      </header>
    </div>
  );
};

export default NewSighting;
