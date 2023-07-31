import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants";

export default function SightingDetails({
  show,
  onHide,
  id,
  refreshCounter,
  setRefreshCounter,
}) {
  // const { reportNumber } = useParams();
  const [sighting, setSighting] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const [newNotes, setNewNotes] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/sightings/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSighting(data);
        const formattedDate = data.date.slice(0, -8);
        setNewDate(formattedDate);
        setCity(data.city);
        setCountry(data.country);
        setNewLocation(data.location_description);
        setNewNotes(data.notes);
        console.log(JSON.stringify(data));
      });
  }, [id, refreshCounter]);

  useEffect(() => {
    console.log(newDate);
  }, [newDate]);

  useEffect(() => {
    console.log(`Fetching sighting with id number: ${id}`);
  }, [id]);

  const editSighting = async (id) => {
    try {
      const date = newDate;
      const location_description = newLocation;
      const notes = newNotes;
      const response = await fetch(`${BACKEND_URL}/sightings/${id}`, {
        method: "PUT",
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

      setRefreshCounter(refreshCounter + 1);
      setEditShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [editShow, setEditShow] = useState(false);

  const handleClose = () => {
    setEditShow(false);
  };

  const handleOpeningOfEditModal = () => {
    onHide();
    setEditShow(true);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
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
        {" "}
        <div
          style={{
            margin: "5px 10px 0px 10px",
            padding: "10px 10px 0px 10px",
            marginTop: "0px",
            maxHeight: "65vh",
            overflowY: "auto",
          }}
        >
          {sighting !== null ? (
            <div>
              <h3>{`Some notes on ID# ${sighting.id}`}</h3>
              <p>{sighting.notes}</p>
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", margin: "0 10px 10px 10px" }}>
          <Button
            variant="secondary"
            onClick={onHide}
            style={{
              margin: "10px",
              position: "sticky",
              zIndex: 1,
              width: "50%",
            }}
          >
            Go back
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleOpeningOfEditModal();
            }}
            style={{
              margin: "10px",
              position: "sticky",
              zIndex: 1,
              width: "50%",
            }}
          >
            Edit
          </Button>
        </div>
      </Modal>

      <Modal
        show={editShow}
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
        <h2>Edit Sighting</h2>
        <label>
          Date:
          <input
            type="datetime-local"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
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
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </label>
        <label>
          Notes:
          <input
            type="text"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
          />
        </label>
        <button onClick={() => setEditShow(false)}>Cancel</button>
        <button
          onClick={() => {
            editSighting(id);
          }}
        >
          Edit
        </button>
      </Modal>
    </div>
  );
}
