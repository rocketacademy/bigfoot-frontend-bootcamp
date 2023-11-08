import { useState } from 'react';
import axios from 'axios';
import Button from './Button';

export default function SightForm() {
  //State for new sightings list
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const BIGFOOTAPI = process.env.REACT_APP_DATABASE_URL;

  //send data to database
  const writeData = async () => {
    const newPost = {
      date: date,
      location: location,
      notes: notes,
    };
    try {
      await axios.post(`${BIGFOOTAPI}/sightings/newSighting`, newPost);

      setDate('');
      setLocation('');
      setNotes('');

      document.getElementById('sighting-form').close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed top-[20px] right-[30px] flex-row">
      <button
        className="bg-slate-400 bg-slate-500 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 border-b-4 border-t-2 border-x-4 border-slate-700 hover:border-slate-500 rounded p-[10px] font-bold text-black "
        onClick={() => {
          document.getElementById('sighting-form').showModal();
        }}
      >
        Create a sighting!
      </button>
      <dialog id="sighting-form" className="modal">
        <div className="modal-box flex flex-col items-center rounded-2xl bg-white">
          <form
            method="dialog"
            className="flex w-96 flex-col items-center justify-center p-[20px] text-black"
          >
            <button
              type="button"
              className="btn btn-circle btn-ghost btn-sm absolute right-5 top-5 "
              onClick={() => {
                document.getElementById('sighting-form').close();
              }}
            >
              ✕
            </button>
            <label className="mb-[5px]">Date:</label>
            <input
              className="input mb-[15px] mr-[15px] w-72 bg-slate-300"
              type="datetime-local"
              name="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            {location.length === 0 ? (
              <label className="mb-[5px] text-red-600">*Location:</label>
            ) : (
              <label className="mb-[5px]">Location:</label>
            )}
            <input
              className="input mb-[15px] mr-[15px] w-64 rounded-md bg-slate-300 px-2"
              type="text"
              name="location"
              value={location}
              placeholder="Where is this located?"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            {notes.length === 0 ? (
              <label className="mb-[5px] text-red-600">*Notes:</label>
            ) : (
              <label className="mb-[5px]">Notes:</label>
            )}
            <input
              className="input mb-[15px] mr-[15px] w-64 rounded-md bg-slate-300 px-2"
              type="text"
              name="notes"
              value={notes}
              placeholder="Description of what you saw"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
            <Button
              label="Submit"
              handleClick={writeData}
              disabled={
                ![date, location, notes].every((field) => field.length > 0)
              }
            />
          </form>
        </div>
      </dialog>
    </div>
  );
}
