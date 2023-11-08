import React from "react";
import Select from "react-select";
import axios from "axios";
import { BACKEND_URL } from "../util/constants";

import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
// import { colourOptions } from "../data";

const animatedComponents = makeAnimated();

// const colourOptions = [
//   { value: "purple", label: "Purple", color: "#5243AA" },
//   { value: "orange", label: "Orange", color: "#FF8B00" },
//   { value: "yellow", label: "Yellow", color: "#FFC400" },
//   { value: "green", label: "Green", color: "#36B37E" },
//   { value: "forest", label: "Forest", color: "#00875A" },
//   { value: "slate", label: "Slate", color: "#253858" },
//   { value: "silver", label: "Silver", color: "#666666" },
// ];

const colourOptions = [
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export const AnimatedMulti = ({ data, sightingIndex }) => {
  const [currentCategoryOptions, setCurrentCategoryOptions] = useState(null);
  const [currentCategoryPriKeys, setCurrentCategoryPriKeys] = useState(null);

  const [allDatabaseCategories, setAllDatabaseCategories] = useState(null);

  const [confirmedCategories, setConfirmedCategories] = useState(null);

  // On Load, set existing categories as default categories in the categories bar.
  useEffect(() => {
    let existingCategories = [];
    let existingCategoryIndexes = [];

    // Set up the categories from backend into proper format for the select bar
    if (data) {
      console.log("there is data: ", data);

      existingCategories = data.map((element) => {
        let category = element.name.toUpperCase();
        return {
          value: `${element.name}`,
          label: `${category}`,
          id: `${element.id}`,
        };
      });

      existingCategoryIndexes = data.map((element) => {
        return element.id;
      });
    }
    setCurrentCategoryOptions(existingCategories);
    setCurrentCategoryPriKeys(existingCategoryIndexes);
    setConfirmedCategories(existingCategoryIndexes);
  }, []);

  // Get all Categories from Database
  useEffect(() => {
    let allCategories = [];

    handleCallAllCategories().then((res) => {
      if (res.success === true) {
        console.log(res.data);

        allCategories = res.data.map((element) => {
          // console.log("element: ", element);
          let category = element.name.toUpperCase();
          return {
            value: `${element.name}`,
            label: `${category}`,
            id: `${element.id}`,
          };
        });
      }
      // console.log("all: ", allCategories);
      setAllDatabaseCategories(allCategories);
    });
  }, []);

  const handleCallAllCategories = async () => {
    // Get Sighting
    let allBackendCategories = await axios.get(
      `${BACKEND_URL}/categories/getAll`
    );
    // setAllDatabaseCategories(allBackendCategories.data);
    return allBackendCategories.data;
  };

  const handleSubmitCategories = async (ev) => {
    ev.preventDefault();
    // Check existing Categories in Database
    // console.log("current category: ", currentCategoryPriKeys);
    // console.log(allDatabaseCategories[4]);

    // Set New Categories
    for (let i = 0; i < confirmedCategories.length; i++) {
      if (!currentCategoryOptions.includes(confirmedCategories[i])) {
        addNewCategory(confirmedCategories[i]);
      }
    }

    // Remove Old Categories
    for (let k = 0; k < currentCategoryPriKeys.length; k++) {
      if (!confirmedCategories.includes(currentCategoryPriKeys[k])) {
        await axios.put(`${BACKEND_URL}/sightings/removeAssignedCategory`, {
          sightingId: sightingIndex,
          categoryId: currentCategoryPriKeys[k],
        });
      }
    }
  };

  const addNewCategory = async (eachCategoryKey) => {
    await axios.put(`${BACKEND_URL}/sightings/assignSightingCategory`, {
      sightingId: sightingIndex,
      categoryId: eachCategoryKey,
    });
  };

  // The return value (the arg) seems to be inbuilt for React Select. returns remaining values
  const handleSelectChange = (remainingOptions) => {
    console.log("remaining: ", remainingOptions);
    let allKeys = remainingOptions.map((item) => {
      return parseInt(item.id);
    });
    console.log(allKeys);
    setConfirmedCategories(allKeys);
  };

  return (
    <>
      {currentCategoryOptions !== null ? (
        <Select
          isMulti
          closeMenuOnSelect={false}
          components={animatedComponents}
          // Needs to accept values from the Axios call - getAssignedCategories
          defaultValue={currentCategoryOptions}
          // Make Axios Call to get ALL available categories.
          options={allDatabaseCategories}
          className="text-black pb-[1em]"
          onChange={handleSelectChange}
        />
      ) : null}

      <button
        onClick={handleSubmitCategories}
        className="bg-indigo-400 py-2 px-3 rounded-md text-slate-900 font-extrabold shadow-md scale-100 transition-all hover:bg-indigo-500 active:scale-90"
      >
        Confirm Categories
      </button>
      <br />
      {/* <button
        onClick={() => {
          console.log("current: ", currentCategoryPriKeys);
        }}
      >
        check pri keys
      </button>
      <br />
      <button
        onClick={() => {
          console.log("confirmed: ", confirmedCategories);
        }}
      >
        check confirmed keys
      </button> */}
    </>
  );
};
