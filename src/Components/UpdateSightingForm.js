import React from "react";

function UpdateSightingForm({
  date,
  locationDescription,
  country,
  cityTown,
  notes,
  onSubmit,
  onChange,
}) {
  return (
    <form onSubmit={onSubmit} className="sighting-form">
      <label htmlFor="date">Date</label>
      <input
        type="text"
        id="date"
        name="date"
        value={date}
        onChange={onChange}
        className="sighting-input"
      />
      <label htmlFor="locationDescription">Location Description</label>
      <input
        type="text"
        id="locationDescription"
        name="locationDescription"
        value={locationDescription}
        onChange={onChange}
        className="sighting-input"
      />
      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        name="country"
        value={country}
        onChange={onChange}
        className="sighting-input"
      />
      <label htmlFor="cityTown">City/Town</label>
      <input
        type="text"
        id="cityTown"
        name="cityTown"
        value={cityTown}
        onChange={onChange}
        className="sighting-input"
      />
      <label htmlFor="notes">Notes</label>
      <textarea
        rows="10"
        cols="50"
        id="notes"
        name="notes"
        value={notes}
        onChange={onChange}
        className="sighting-input"
      />
      <button type="submit" className="new-sighting-btn">
        Update
      </button>
    </form>
  );
}

export default UpdateSightingForm;
