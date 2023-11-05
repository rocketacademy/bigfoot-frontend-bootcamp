import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Import Components
import { AnimatedMulti } from "../Components/CategorySelect.js";
import { SimpleTable } from "../Components/SimpleTable.js";
import { CommentTable } from "../Components/CommentTable.js";

export const SightID = ({ backend_url }) => {
  const [sightingInfo, setSightingInfo] = useState(null);
  const [categoriesInfo, setCategoriesInfo] = useState(null);
  const [commentsInfo, setCommentsInfo] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const BACKEND_URL = backend_url;
  const sightingIndex = params.sightingIndex;

  useEffect(() => {
    handleCallAPI();
  }, []);

  // useEffect(() => {

  // }, [categoriesInfo]);

  // Handle Undefined Route
  useEffect(() => {
    console.log(params);
    if (sightingIndex === "undefined") {
      console.log("undefined detected");
      navigate(-1);
    }
  }, []);

  // GET PARTICULAR SIGHTING + ASSOCIATED INFORMATION
  const handleCallAPI = async () => {
    console.log("initialised");

    // Get Sighting
    let information = await axios.get(
      `${BACKEND_URL}/sightings/${sightingIndex}`
    );

    // Get Assigned Categories
    let assignedCategories = await axios.get(
      `${BACKEND_URL}/sightings/${sightingIndex}/getCategories`
    );

    // Get Sighting's Comments
    let allComments = await axios.get(
      `${BACKEND_URL}/sightings/${sightingIndex}/getAllComments`
    );

    setCategoriesInfo(assignedCategories.data);
    setSightingInfo(information.data);
    setCommentsInfo(allComments.data);
  };

  return (
    <>
      <div className="flex flex-row w-[100%] h-[100vh] justify-center py-[2em] gap-10 ">
        <div className="flex flex-col w-[80%] h-[60%]  text-center gap-10 ">
          <div className="font-bold">
            Details About Sighting {sightingIndex}
          </div>

          <div>
            <NavLink to="/">
              <button className="bg-slate-400 py-2 px-3 rounded-md text-slate-900 font-extrabold shadow-md scale-100 transition-all hover:bg-slate-500 active:scale-90">
                BACK TO HOME
              </button>
            </NavLink>
          </div>

          {/* Categories */}
          <div>
            {categoriesInfo != null && categoriesInfo.success === true && (
              <AnimatedMulti
                data={categoriesInfo.data}
                sightingIndex={sightingIndex}
              />
            )}

            {/* <AnimatedMulti /> */}
          </div>
          {/* <div className="border-red-400">
            {sightingInfo.success === false
              ? "no data received"
              : "data received"}
          </div> */}

          <div>
            {sightingInfo !== null ? (
              <SimpleTable sightingData={sightingInfo.data} />
            ) : null}
          </div>

          {/* <button
            onClick={() => {
              console.log(commentsInfo);
            }}
          >
            hello
          </button> */}

          <div className="flex flex-row justify-center align-middle w-[100%]">
            {commentsInfo !== null ? (
              <CommentTable
                commentsData={commentsInfo}
                sightingIndex={sightingIndex}
                BACKEND_URL={BACKEND_URL}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* <div>
        <Link to="information">View Sightings</Link>
      </div>
      <Outlet /> */}
    </>
  );
};
