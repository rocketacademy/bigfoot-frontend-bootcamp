import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { BACKEND_URL } from "../util/constants";

// Import Components
import { DataTable } from "../Components/DataTable";

export const HomePage = () => {
  const [receivedData, setReceivedData] = useState(null);
  // const [inputField, setInputField] = useState("");
  const [textField, setTextField] = useState({});

  // const handleChange = (ev) => {
  //   ev.preventDefault();
  //   setInputField(ev.target.value);
  // };

  const handleTextChange = (ev) => {
    let { name, value } = ev.target;

    setTextField((prevTextField) => ({
      ...prevTextField,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleAPICall();
  }, []);

  const handleAPICall = async () => {
    // console.log("AXIOS GET request");
    let information = await axios.get(`${BACKEND_URL}`);
    setReceivedData(information.data.data);
  };

  const handleAddSighting = async (ev) => {
    ev.preventDefault();
    console.log(textField.sightingdate);
    console.log(textField.sightinglocation);
    console.log(textField.sightingnotes);
    if (
      textField.sightingdate &&
      textField.sightinglocation &&
      textField.sightingnotes
    ) {
      // API call
      let information = await axios.post(
        `${BACKEND_URL}/sightings/addSighting`,
        {
          date: textField.sightingdate,
          location: textField.sightinglocation,
          notes: textField.sightingnotes,
        }
      );
    } else {
      alert("fill in properly!");
    }
  };

  return (
    <>
      <div className="flex flex-row flex-wrap w-[100%] h-[100vh] justify-center py-[2em] gap-[11em] lg:gap-10 border border-red-600">
        <div
          className="flex flex-col lg:w-[30%] w-[80%] h-[100%] justify-start  rounded-[1em] border text-center gap-[2em] bg-cover
      bg-[url('https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/random%2Fmonster.PNG?alt=media&token=23ff00ff-83d9-4148-aae1-93cd0ddb5b07&_gl=1*mniaah*_ga*MTc3MTA5OTgxNC4xNjk2OTI0NDgx*_ga_CW55HF8NVT*MTY5OTA3ODI0Ni4zNC4xLjE2OTkwNzg1ODUuNTguMC4w')]
         "
        >
          <div className="">
            <h1 className="font-bold text-[2.5rem] lg:text-[4rem] pt-[1em] m-0 text-slate-100 lg:px-5 leading-[1em]">
              BIGFOOT HUNTER
            </h1>
          </div>

          <div className="flex flex-row w-full justify-center">
            <p className="text-xl text-slate-200 bg-red-700 bg-opacity-90 w-fit px-[1em] py-[.5em] rounded-md animate-bounce">
              STATUS:
              <br />
              {receivedData === null ? (
                "No Data Received"
              ) : (
                <p className="font-bold">"READY TO HUNT"</p>
              )}
            </p>
          </div>

          <div>
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
              }}
            >
              <input
                type="text"
                name="sightings"
                placeholder="Search by primary key"
                onChange={handleTextChange}
                className="text-slate-800 mb-[1em] rounded-lg"
                autoComplete="off"
              />
              <br />
              <NavLink to={`sightings/${textField.sightings}`}>
                <button className="bg-orange-400 py-2 px-3 rounded-md text-slate-900 font-bold shadow-md scale-100 transition-all hover:bg-red-500 hover:scale-105 active:scale-90">
                  Go to Sightings
                </button>
              </NavLink>
            </form>
          </div>

          {/* <button
            onClick={() => {
              console.log(textField.newSighting);
            }}
          >
            hey
          </button> */}

          <div className="flex flex-row justify-center ">
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
              }}
            >
              <input
                type="text"
                name="sightingdate"
                placeholder="Date of Sighting"
                onChange={handleTextChange}
                className="text-slate-800 mb-[1em] rounded-lg w-full"
                autoComplete="off"
              />
              <br />
              <input
                type="text"
                name="sightinglocation"
                placeholder="Sighting Location"
                onChange={handleTextChange}
                className="text-slate-800 mb-[1em] rounded-lg w-full"
                autoComplete="off"
              />
              <br />
              <textarea
                type="text"
                name="sightingnotes"
                placeholder="Description of Sighting"
                onChange={handleTextChange}
                className="text-slate-800 mb-[1em] rounded-lg"
                autoComplete="off"
                style={{
                  width: "100%",
                  height: "6em",
                  resize: "none",
                  border: "none",
                  outline: "none",
                }}
              />
              <button
                onClick={handleAddSighting}
                className="bg-indigo-600 py-2 px-3 rounded-md text-slate-100 font-bold shadow-md scale-100 transition-all hover:bg-indigo-700 hover:scale-105 active:scale-90"
              >
                Add New Sighting
              </button>
            </form>
          </div>
        </div>

        {/* Table Column */}
        <div className="flex flex-col lg:w-[60%] w-[80%] h-[100%] text-center gap-10 ">
          {receivedData === null ? (
            "no data received"
          ) : (
            <DataTable data={receivedData} />
          )}
        </div>
      </div>
    </>
  );
};
