import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import SightingDetails from "./SightingDetails";
import { BACKEND_URL } from "../constants";

export default function AllSightings() {
  const [sightings, setSightings] = useState(null);
  const [filteredSightings, setFilteredSightings] = useState(null);
  const [show, setShow] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const [beginYear, setBeginYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [season, setSeason] = useState("");
  const [state, setState] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [categories, setCategories] = useState(null);

  const sightingsURL = `${BACKEND_URL}/sightings`;
  const categoriesURL = `${BACKEND_URL}/category`;

  function getSightings() {
    const fetchData = async () => {
      try {
        console.log(sightingsURL);
        const response = await fetch(sightingsURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSightings(data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }

  function getCategories() {
    const fetchData = async () => {
      try {
        console.log(categoriesURL);
        const response = await fetch(categoriesURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const result = data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        console.log(result);
        setCategories(result);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setCategoryIds(selectedIds);
  };

  useEffect(() => {
    getSightings();
    getCategories();
  }, [refreshCounter]);

  // states and functions for Add Sighting
  const [addShow, setAddShow] = useState(false);
  const [date, setDate] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [locationDescription, setLocation] = useState("");
  const [categoryIds, setCategoryIds] = useState("");
  const [notes, setNotes] = useState("");

  const addSighting = async () => {
    try {
      const response = await fetch(sightingsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          city,
          country,
          locationDescription,
          categoryIds,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setAddShow(false);
      setRefreshCounter(refreshCounter + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(sightings);
  }, [sightings]);

  // const handleFilterByYear = (year) => {
  //   const fetchData = async () => {
  //     try {
  //       let sightingsURL = `${BACKEND_URL}/sightings`;

  //       if (year) {
  //         console.log(`Selected year: ${year}`);
  //         setSelectedYear(year);
  //         sightingsURL += `?year=${year}`;
  //       }

  //       const response = await fetch(sightingsURL);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setSightings(data);
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };

  //   setSortByOption(null);
  //   fetchData();
  // };

  // const handleSortBy = (option) => {
  //   const fetchData = async () => {
  //     try {
  //       let sightingsURL = `${BACKEND_URL}/sightings`;
  //       let params = new URLSearchParams();

  //       if (option) {
  //         console.log(`Selected sort option: ${option}`);
  //         setSortByOption(option);
  //         params.append("sort", option);
  //       }

  //       sightingsURL += `?${params.toString()}`;

  //       const response = await fetch(sightingsURL);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setSightings(data);
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };

  //   setSelectedYear("");
  //   fetchData();
  // };

  const handleClose = () => {
    setShow(false);
    setAddShow(false);
    setModalShow(false);
  };

  const handleShow = () => setShow(true);

  const filterSightings = (beginYear, endYear, season, state) => {
    if (beginYear === "" && endYear === "" && season === "" && state === "") {
      setFilteredSightings(sightings);
    } else {
      const filteredSightings = sightings.filter((sighting) => {
        const year = parseInt(sighting.YEAR, 10);
        return (
          (beginYear === "" || year >= parseInt(beginYear, 10)) &&
          (endYear === "" || year <= parseInt(endYear, 10)) &&
          (season === "" || sighting.SEASON === season) &&
          (state === "" || sighting.STATE === state)
        );
      });

      setFilteredSightings(filteredSightings);
    }
  };

  const handleFilter = () => {
    filterSightings(beginYear, endYear, season, state);
    handleClose();
  };

  const handleClear = () => {
    filterSightings("", "", "", "");
    handleClose();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="primary" onClick={() => setAddShow(true)}>
          Add Sighting
        </Button>
      </div>

      {sightings ? (
        <div
          className="container"
          style={{
            margin: "2svh 0",
            height: "80svh",
            overflowY: "auto",
            borderRadius: "10px",
          }}
        >
          <div className="row">
            {sightings.map((sighting, index) =>
              sighting.REPORT_NUMBER === null ? null : (
                <div className="col-sm-3" key={index}>
                  <div
                    className="card"
                    style={{
                      margin: "0.5rem",
                      minWidth: "200px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedReport(sighting.id);
                      setModalShow(true);
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-text">{`ID# ${
                        sighting.id
                      }; Date: ${sighting.date.slice(0, -14)}`}</h5>
                      <h5 className="card-text">{`Location: ${sighting.locationDescription}`}</h5>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div
          className="container"
          style={{
            margin: "2svh 0",
            height: "80svh",
            overflowY: "auto",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <em>No sightings in selected year</em>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Sightings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Begin Year</Form.Label>
              <Form.Control
                type="number"
                value={beginYear}
                onChange={(e) => setBeginYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>End Year</Form.Label>
              <Form.Control
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Season</Form.Label>
              <Form.Control
                as="select"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="">--Select a season--</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleFilter}>
            Apply Filter
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={addShow}
        onHide={handleClose}
        style={{
          maxHeight: "75vh",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Add this line
          overflow: "hidden",
        }}
      >
        <h2>Add Sighting</h2>
        <label>
          Date:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <label>
          Location Description:
          <input
            type="text"
            value={locationDescription}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label>
          Category:
          <Select
            isMulti
            options={categories}
            // value={selectedCategories}
            onChange={handleSelectChange}
          />
        </label>

        <label>
          Notes:
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <button onClick={() => setAddShow(false)}>Cancel</button>
        <button onClick={addSighting}>Add</button>
      </Modal>

      <SightingDetails
        show={modalShow}
        onHide={handleClose}
        id={selectedReport}
        refreshCounter={refreshCounter}
        setRefreshCounter={setRefreshCounter}
        categories={categories}
        categoryIds={categoryIds}
        setCategoryIds={setCategoryIds}
      />
    </div>
  );
}
