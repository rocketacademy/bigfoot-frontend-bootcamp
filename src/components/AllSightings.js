import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [selectedIndex, setSelectedIndex] = useState(null);

  const years = Array.from({ length: 2023 - 1944 + 1 }, (_, i) => 1944 + i);
  const [selectedYear, setSelectedYear] = useState("");
  const [sortByOption, setSortByOption] = useState(null);

  const sightingsURL = `${BACKEND_URL}/sightings`;

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
    setSelectedYear("");
  }

  useEffect(() => {
    getSightings();
  }, [refreshCounter]);

  // states and functions for Add Sighting
  const [addShow, setAddShow] = useState(false);
  const [date, setDate] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [location_description, setLocation] = useState("");
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
          location_description,
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
        {/* <Button variant="primary" onClick={() => getSightings()}>
          Get Sightings
        </Button> */}

        <Button variant="primary" onClick={() => setAddShow(true)}>
          Add Sighting
        </Button>

        {/* <Button
          variant="secondary"
          onClick={() => handleShow()}
          style={{ marginLeft: "10px" }}
          disabled={!sightings}
        >
          Filter
        </Button> */}

        {/* <Dropdown
          onSelect={handleFilterByYear}
          style={{
            marginLeft: "10px",
          }}
          disabled={!sightings}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {selectedYear || "Filter Year"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "25svh", overflowY: "auto" }}>
            <Dropdown.Item onClick={() => setSelectedYear("")}>
              Select All
            </Dropdown.Item>
            {years.map((year, index) => (
              <Dropdown.Item key={index} eventKey={year}>
                {year}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown> */}

        {/* <Dropdown
          onSelect={handleSortBy}
          style={{
            marginLeft: "10px",
          }}
          disabled={!sightings}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {sortByOption || "Sort by"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "25svh", overflowY: "auto" }}>
            <Dropdown.Item eventKey={"Default"}>Default</Dropdown.Item>
            <Dropdown.Item eventKey={"Oldest sighting first"}>
              Oldest sighting first
            </Dropdown.Item>
            <Dropdown.Item eventKey={"Newest sighting first"}>
              Newest sighting first
            </Dropdown.Item>
            <Dropdown.Item eventKey={"A to Z by State"}>
              A to Z by State
            </Dropdown.Item>
            <Dropdown.Item eventKey={"Z to A by State"}>
              Z to A by State
            </Dropdown.Item>
            <Dropdown.Item eventKey={"A to Z by Season"}>
              A to Z by Season
            </Dropdown.Item>
            <Dropdown.Item eventKey={"Z to A by Season"}>
              Z to A by Season
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>

      {sightings ? (
        <div
          className="container"
          style={{
            margin: "2svh 0",
            height: "80svh",
            overflowY: "auto",
            // border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          <div className="row">
            {
              // filteredSightings
              //   ? filteredSightings.map((filteredSightings, index) =>
              //       filteredSightings.REPORT_NUMBER === null ? null : (
              //         <div className="col-sm-3" key={index}>
              //           {/* <Link to={`/sightings/${index}`}> */}
              //           <div
              //             className="card"
              //             style={{
              //               margin: "0.5rem",
              //               minWidth: "200px",
              //               cursor: "pointer",
              //             }}
              //             onClick={() => {
              //               setSelectedReport(filteredSightings.REPORT_NUMBER);
              //               setModalShow(true);
              //             }}
              //           >
              //             <div className="card-body">
              //               <h5 className="card-title">
              //                 {filteredSightings.YEAR}
              //               </h5>
              //               <p className="card-text">
              //                 {filteredSightings.SEASON}
              //               </p>
              //               <p className="card-text">{filteredSightings.STATE}</p>
              //               {/* More rendering here as needed */}
              //             </div>
              //           </div>
              //           {/* </Link> */}
              //         </div>
              //       )
              //     )
              //   :
              sightings.map((sighting, index) =>
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
                        setSelectedIndex(index);
                        setModalShow(true);
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-text">{`ID# ${
                          sighting.id
                        }; Date: ${sighting.date.slice(0, -14)}`}</h5>
                        <h5 className="card-text">{`Location: ${sighting.location_description}`}</h5>
                      </div>
                    </div>
                  </div>
                )
              )
            }
          </div>
        </div>
      ) : (
        <div
          className="container"
          style={{
            margin: "2svh 0",
            height: "80svh",
            overflowY: "auto",
            // border: "1px solid black",
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
          // overflowY: "auto",
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
            value={location_description}
            onChange={(e) => setLocation(e.target.value)}
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
        index={selectedIndex}
        refreshCounter={refreshCounter}
        setRefreshCounter={setRefreshCounter}
      />
    </div>
  );
}
