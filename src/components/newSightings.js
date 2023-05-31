import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewSightingsForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // call all the categories first upon page loading:
  useEffect(() => {
    const getAllCategories = async () => {
      const categories = await axios.get(`${BACKEND_URL}/categories`);
      setAllCategories(categories.data);
      console.log(categories);
    };
    getAllCategories();
  }, []);

  console.log("all categories in local state:", allCategories);

  // categoryOptions for Category form input selection:
  const categoryOptions = allCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  // handle change for category selection form:
  const handleSelectChange = (categories) => {
    setSelectedCategories(categories);
  };

  console.log(selectedCategories);

  // styling colours for the category selection:
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract category IDs to send to backend
    const selectedCategoryIds = selectedCategories.map(({ value }) => value);
    console.log(selectedCategoryIds);

    // Perform form submission actions

    axios
      .post(`${BACKEND_URL}/sightings`, {
        date: state.date,
        location: state.location,
        notes: state.notes,
        selectedCategoryIds,
      })
      .then((res) => {
        setState({ date: "", location: "", notes: "" });
        setSelectedCategories([]);

        navigate(`/sightings/${res.data.id}`);
      });

    console.log("Date:", state.date);
    console.log("Location", state.location);
    console.log("Location", state.notes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <Select
          isMulti
          styles={selectFieldStyles}
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
        />
      </label>
      <label>
        Date:
        <input
          type="text"
          id="date"
          value={state.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          id="location"
          value={state.location}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Notes:
        <input
          type="text"
          id="notes"
          value={state.notes}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewSightingsForm;
