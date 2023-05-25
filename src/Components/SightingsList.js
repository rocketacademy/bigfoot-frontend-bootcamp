import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Navbar from "./Navbar";
import Filter from "./Filter";

function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [filteredSightings, setFilteredSightings] = useState([]);

  const navigate = useNavigate();

  const fetchSightings = async () => {
    const url = `${BACKEND_URL}/sightings`;

    try {
      await axios.get(url).then((res) => {
        setSightings(res.data);
        setFilteredSightings(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log("Error fetching sightings: ", error);
    }
  };

  useEffect(() => {
    fetchSightings();
  }, []);

  const filterSightings = (filterValues) => {
    const { date, locationDescription, country, cityTown, notes } =
      filterValues;
    const filtered = sightings.filter((sighting) => {
      const matchDate = !date || sighting.date.includes(date);
      const matchLocationDescription =
        !locationDescription ||
        sighting.locationDescription.includes(locationDescription);
      const matchCountry = !country || sighting.country.includes(country);
      const matchCityTown = !cityTown || sighting.cityTown.includes(cityTown);
      const matchNotes = !notes || sighting.notes.includes(notes);
      return (
        matchDate &&
        matchLocationDescription &&
        matchCountry &&
        matchCityTown &&
        matchNotes
      );
    });
    setFilteredSightings(filtered);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="sightings-ctn">
        <div className="filter-ctn">
          <Filter onFilter={filterSightings} />
        </div>

        <div className="filtered-sightings-ctn">
          {filteredSightings.map((sighting) => (
            <div key={sighting.id} className="sightings-list-ctn">
              <Link to={`/sightings/${sighting.id}`} className="sightings-list">
                {" "}
                <div className="category-ctn">
                  {sighting.categories.length > 0
                    ? `Category:`
                    : `Category: NA`}
                  {sighting.categories &&
                    sighting.categories.map((category) => (
                      <div key={category.id} className="category">
                        {category.name}
                      </div>
                    ))}{" "}
                </div>
                {sighting.date.slice(0, 4)} - {sighting.cityTown},{" "}
                {sighting.country}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SightingsList;
