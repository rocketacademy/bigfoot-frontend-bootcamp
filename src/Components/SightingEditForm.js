import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import makeAnimated from "react-select/animated";
import Creatable from "react-select/creatable";

export default function SightingEditForm({ sighting, setSighting }) {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [updatedSighting, setUpdatedSighting] = useState({});
  const [options, setOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/categories`);
      console.log(data);
      setOptions(
        data.map((option) => ({ value: option.id, label: option.name }))
      );
    };

    fetchCategories();
  }, []);

  const handleUpdate = async (id) => {
    const { data } = await axios.put(`${BACKEND_URL}/sightings/${id}`, {
      date: updatedSighting.date || sighting.date,
      location_description:
        updatedSighting.location_description || sighting.location_description,
      notes: updatedSighting.notes || sighting.notes,
      city: updatedSighting.city || sighting.city,
      country: updatedSighting.country || sighting.country,
      categoryId: userOptions.map((option) => option.value),
    });

    setSighting((prev) => ({
      ...prev,
      date: data.date || sighting.date,
      location_description:
        data.location_description || sighting.location_description,
      notes: data.notes || sighting.notes,
      city: data.city || sighting.city,
      country: data.country || sighting.country,
      categoryId: data.map((option) => ({
        value: option.id,
        label: option.name,
      })),
    }));
    setEditMode(false);
    navigate(`/sightings/${id}`);
  };

  const getHTML5DateTimeStringFromDate = (d) => {
    if (!(d instanceof Date)) {
      d = new Date(d); // Try converting to Date object if it's not already
    }

    if (isNaN(d.getTime())) {
      return ""; // Return an empty string for invalid dates
    }

    const dateString =
      d.getFullYear().toString().padStart(4, "0") +
      "-" +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      d.getDate().toString().padStart(2, "0");

    const timeString =
      d.getHours().toString().padStart(2, "0") +
      ":" +
      d.getMinutes().toString().padStart(2, "0");

    // Combine the date and time strings with "T" in between
    return `${dateString}T${timeString}`;
  };

  const backToHomePage = () => {
    navigate("/");
  };

  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(async () => {
      const newOption = createOption(inputValue);
      const { data } = await axios.post(`${BACKEND_URL}/categories`, {
        name: newOption.value,
      });
      setIsLoading(false);
      setOptions((prev) => [
        ...prev,
        { label: newOption.label, value: data.id },
      ]);
      setUserOptions((prev) => [
        ...prev,
        { label: newOption.label, value: data.id },
      ]);
    }, 1000);
  };
  
  return (
    <div>
      <Button onClick={backToHomePage}>Home</Button>
      <br />
      <Button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Cancel" : "Edit"}
      </Button>
      <br />

      {editMode ? (
        <div>
          <input
            type="datetime-local"
            value={getHTML5DateTimeStringFromDate(
              updatedSighting.date || new Date(sighting.date)
            )}
            onChange={({ target }) =>
              setUpdatedSighting((prev) => ({ ...prev, date: target.value }))
            }
          />
          <br />
          <input
            type="text"
            value={
              updatedSighting.location_description ||
              sighting.location_description
            }
            onChange={({ target }) =>
              setUpdatedSighting((prev) => ({
                ...prev,
                location_description: target.value,
              }))
            }
          />
          <br />
          <textarea
            type="text"
            value={updatedSighting.notes || sighting.notes}
            onChange={({ target }) =>
              setUpdatedSighting((prev) => ({ ...prev, notes: target.value }))
            }
          />
          <br />
          <input
            type="text"
            value={updatedSighting.city || sighting.city}
            onChange={({ target }) =>
              setUpdatedSighting((prev) => ({
                ...prev,
                city: target.value,
              }))
            }
          />
          <br />
          <input
            type="text"
            value={updatedSighting.country || sighting.country}
            onChange={({ target }) =>
              setUpdatedSighting((prev) => ({
                ...prev,
                country: target.value,
              }))
            }
          />
          <br />
          <Creatable
            components={makeAnimated()}
            isMulti
            options={options}
            value={userOptions}
            // onChange={(selectedOptions) => setUserOptions(selectedOptions)}
            styles={{
              option: (defaultStyles) => ({
                ...defaultStyles,
                color: "black",
              }),
            }}
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newValue) => setUserOptions(newValue)}
            onCreateOption={handleCreate}
          />
          <Button onClick={() => handleUpdate(sighting.id)}>Update</Button>
        </div>
      ) : (
        <>
          <p>id: {sighting && sighting.id}</p>
          <p>date: {sighting && new Date(sighting.date).toLocaleString()}</p>
          <p>
            location_description: {sighting && sighting.location_description}
          </p>
          <p>notes: {sighting && sighting.notes}</p>
          <p>city: {sighting && sighting.city}</p>
          <p>country: {sighting && sighting.country}</p>
          <p>
            Categories:{" "}
            {sighting.categories.map((category) => category.name).join(", ")}
          </p>
        </>
      )}
    </div>
  );
}
