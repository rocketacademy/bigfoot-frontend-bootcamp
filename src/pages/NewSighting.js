import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Select from "react-select";
import { BACKEND_URL } from "../constants";
import "../App.css";

const NewSighting = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [inputFields, setInputfields] = useState({
    date: "",
    location: "",
    notes: "",
  });
  const [selectFields, setSelectFields] = useState([]);

  const fetchCategories = async () => {
    const fetchedCategories = await fetch(BACKEND_URL + "/categories/", {
      method: "get",
    });
    const fetchedCategoriesJson = await fetchedCategories.json();

    const newCategoryOptions = fetchedCategoriesJson.map((response) => ({
      value: response.id,
      label: response.categoryName,
    }));

    setCategoryOptions(newCategoryOptions);
    console.log(categoryOptions);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Make text black in Select field
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const handleChange = (e, field) => {
    let newFields = { ...inputFields };
    newFields[field] = e.target.value;
    setInputfields(newFields);
  };
  const handleSelectChange = (e) => {
    const categoriesArr = e.map((obj) => obj.value);
    console.log(categoriesArr);
    setSelectFields(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addNewSighting = async () => {
      const categoriesArr = selectFields.map((obj) => obj.value);
      await fetch(BACKEND_URL + "/sightings/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputFields, categories: categoriesArr }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    };
    addNewSighting();
    //reset input fields
    setInputfields({
      date: "",
      location: "",
      notes: "",
    });
    //reset select fields
    setSelectFields([]);
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
            className="block mb"
            type="text"
            value={inputFields.date}
            onChange={(e) => handleChange(e, "date")}
          ></input>
          <label className="block">location: </label>
          <input
            className="block mb"
            type="text"
            value={inputFields.location}
            onChange={(e) => handleChange(e, "location")}
          ></input>
          <label className="block">Categories: </label>
          <Select
            isMulti
            className="select-input"
            options={categoryOptions}
            styles={selectFieldStyles}
            value={selectFields}
            onChange={(e) => handleSelectChange(e)}
          ></Select>
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
