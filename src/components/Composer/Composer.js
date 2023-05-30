import { useEffect, useState } from "react";
import "./Composer.css";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import Select from "react-select";
import { capitalise, months } from "../../utils";

const monthList = [
  { value: 1, label: months[0] },
  { value: 2, label: months[1] },
  { value: 3, label: months[2] },
  { value: 4, label: months[3] },
  { value: 5, label: months[4] },
  { value: 6, label: months[5] },
  { value: 7, label: months[6] },
  { value: 8, label: months[7] },
  { value: 9, label: months[8] },
  { value: 10, label: months[9] },
  { value: 11, label: months[10] },
  { value: 12, label: months[11] },
];

const Composer = ({ setComposer, setData }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [season, setSeason] = useState("");
  const [notes, setNotes] = useState("");
  const [categoriesList, setCategoriesList] = useState("");
  const [categories, setCategories] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = [];
      const fetchedCategories = await axios.get(BACKEND_URL + "/categories");
      fetchedCategories.data.map((category) => {
        const categoryObject = {
          value: category.id,
          label: capitalise(category.name),
        };
        return categories.push(categoryObject);
      });
      setCategoriesList(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (month >= 3 && month <= 5) {
      setSeason("Spring");
    } else if (month >= 6 && month <= 8) {
      setSeason("Summer");
    } else if (month >= 9 && month <= 11) {
      setSeason("Fall");
    } else {
      setSeason("Winter");
    }
  }, [month]);

  const handleChange = (e) => {
    const id = e.target.id;
    if (id === "year") {
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

  const handleCategorySelect = (e) => {
    const selectedCategories = [];
    e.forEach((e) => selectedCategories.push(e.value));
    setCategories(selectedCategories);
  };

  const handleMonthSelect = (e) => {
    setMonth(e.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(BACKEND_URL + "/sightings", {
      month: months[month - 1],
      year: year,
      location: location,
      season: season,
      notes: notes,
    });
    await axios.post(BACKEND_URL + "/categories", {
      sightingId: result.data.sighting.id,
      categoryIds: categories,
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
        <Select
          className="select-field"
          options={monthList}
          onChange={handleMonthSelect}
          placeholder="Select month"
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
        {categoriesList && (
          <Select
            isMulti
            className="select-field"
            options={categoriesList}
            onChange={handleCategorySelect}
            placeholder="Select weather"
          />
        )}
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
