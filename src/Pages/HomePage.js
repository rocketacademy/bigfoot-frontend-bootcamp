import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const HomePage = () => {
  const [receivedData, setReceivedData] = useState(null);
  const [inputField, setInputField] = useState("");

  const handleChange = (ev) => {
    ev.preventDefault();
    // console.log(ev.target.value);
    setInputField(ev.target.value);
  };

  const handleAPICall = async () => {
    console.log("onclick");

    let information = await axios.get("http://localhost:8080/sightings");
    console.log(information.data);
    setReceivedData(information.data);
    // console.log(receivedData);
  };

  return (
    <>
      <div className="grid grid-cols-1 place-items-center h-[100vh] border">
        <div className="flex flex-col w-[60%] h-[60%] border text-center gap-10 ">
          <div className="h-[10em]">
            <h1 className="font-bold text-[1.5rem] py-2 text-sky-600">
              Get Bigfoot Data!
            </h1>
            <div className="text-center">
              <input
                type="text"
                placeholder="insert year to display"
                onChange={handleChange}
                className="text-slate-800 mb-[1em]"
              />
              <br />
              <button
                onClick={handleAPICall}
                className="bg-indigo-400 py-2 px-3 rounded-md text-slate-900 font-extrabold shadow-md scale-100 transition-all hover:bg-indigo-500 active:scale-90"
              >
                GET DATA
              </button>
            </div>
          </div>
          <div>
            <p className="text-xl">Status:</p>
            {receivedData === null ? "No Data Received" : " Data Downloaded!"}
          </div>
          <br />

          <div>
            <NavLink to="sightings/123">Go to Sightings</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
