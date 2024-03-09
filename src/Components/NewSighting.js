import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import { Link } from "react-router-dom";

export const NewSighting = () => {
  const [dateValue, setDateValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [categoryValues, setCategoryValues] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/categories`)
      .then((response) => {
        setAllCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategoryValues(selectedCategoryIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${BACKEND_URL}/sightings`, {
          date: dateValue,
          location: locationValue,
          notes: noteValue,
          selectedCategoryIds: categoryValues,
        })
        .then((res) => {
          setDateValue("");
          setLocationValue("");
          setNoteValue("");
          setCategoryValues([]);
        });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(categoryValues);

  return (
    <>
      <div className="prose max-w-full p-12">
        <h1 className="text-center">Submit Sighting</h1>
        <Link to={`/`}>
          <button className="btn mb-10">Back</button>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="pb-8 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-8"
        >
          <div className="sm:col-start-2 sm:col-span-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">{"Date"}</span>
              </div>
              <input
                placeholder="Type here"
                className="input input-bordered w-full"
                type="datetime-local"
                // pattern="\d{4}-\d{2}-\d{2}"
                value={dateValue}
                onChange={(e) => {
                  setDateValue(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <div className="sm:col-start-5 sm:col-span-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">{"Location"}</span>
              </div>
              <input
                placeholder="Type here"
                className="input input-bordered w-full"
                value={locationValue}
                onChange={(e) => {
                  setLocationValue(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <div className="sm:col-start-2 sm:col-span-3">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">{"Notes"}</span>
              </div>
              <input
                placeholder="Type here"
                className="input input-bordered w-full"
                value={noteValue}
                onChange={(e) => {
                  setNoteValue(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <label className="form-control sm:col-start-5 sm:col-span-3">
            <div className="label">
              <span className="label-text">Select Cateogry</span>
            </div>
            <select
              className="select select-bordered"
              value={categoryValues}
              onChange={handleCategoryChange}
              multiple
            >
              <option disabled selected>
                Pick one
              </option>
              {allCategories.length > 0 &&
                allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>
          <button
            className="btn btn-primary sm:col-start-4 sm:col-span-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
