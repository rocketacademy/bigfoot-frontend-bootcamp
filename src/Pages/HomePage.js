import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

// Import Components
import { DataTable } from "../Components/DataTable";

export const HomePage = () => {
  const [receivedData, setReceivedData] = useState(null);
  const [inputField, setInputField] = useState("");
  const [textField, setTextField] = useState({});

  const handleChange = (ev) => {
    ev.preventDefault();
    setInputField(ev.target.value);
  };

  const handleTextChange = (ev) => {
    let { name, value } = ev.target;
    setTextField({
      [name]: value,
    });
  };

  useEffect(() => {
    handleAPICall();
  }, []);

  const handleAPICall = async () => {
    // console.log("AXIOS GET request");
    let information = await axios.get(`http://localhost:8080/`);
    setReceivedData(information.data.data);
  };

  return (
    <>
      <div className="flex flex-row flex-wrap w-[100%] h-[100vh] justify-center py-[2em] gap-10 border border-red-600">
        <div
          className="flex flex-col lg:w-[30%] w-[80%] h-[100%] justify-start lg:pt-[5em] rounded-[1em] border text-center gap-[2em] bg-cover
      bg-[url('https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/random%2Fmonster.PNG?alt=media&token=23ff00ff-83d9-4148-aae1-93cd0ddb5b07&_gl=1*mniaah*_ga*MTc3MTA5OTgxNC4xNjk2OTI0NDgx*_ga_CW55HF8NVT*MTY5OTA3ODI0Ni4zNC4xLjE2OTkwNzg1ODUuNTguMC4w')]
         "
        >
          <div className="">
            <h1 className="font-bold text-[2.5rem] lg:text-[4rem] pt-[1em] m-0 text-slate-100 lg:px-5 leading-[1em]">
              BIGFOOT HUNTER
            </h1>
          </div>

          <div className="flex flex-row w-full justify-center">
            <p className="text-xl text-slate-200 bg-slate-700 bg-opacity-90 w-fit px-[1em] py-[.5em] rounded-md">
              Status:
              <br />
              {receivedData === null ? "No Data Received" : " Data Downloaded!"}
            </p>
          </div>
          <br />

          <div>
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
              }}
            >
              <input
                type="text"
                name="sightings"
                placeholder="insert year to display"
                onChange={handleTextChange}
                className="text-slate-800 mb-[1em] rounded-lg"
                autoComplete="off"
              />
              <br />
              <NavLink to={`sightings/${textField.sightings}`}>
                <button className="bg-orange-400 py-2 px-3 rounded-md text-slate-900 font-extrabold shadow-md scale-100 transition-all hover:bg-red-500 active:scale-90">
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

          <div>
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
              }}
            >
              <input
                type="text"
                name="newSighting"
                placeholder="New Sighting Description"
                onChange={handleTextChange}
                className="text-slate-800 mb-[1em] rounded-lg"
                autoComplete="off"
              />
              <br />
              <button className="bg-orange-400 py-2 px-3 rounded-md text-slate-900 font-extrabold shadow-md scale-100 transition-all hover:bg-red-500 active:scale-90">
                Add New Sighting
              </button>
            </form>
          </div>
        </div>

        {/* Table Column */}
        <div className="flex flex-col lg:w-[60%] w-[80%] h-[100%] border text-center gap-10 ">
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
