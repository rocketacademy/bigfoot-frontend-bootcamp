// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { Home } from './components/Home';
import { Sightings } from './components/Sightings';
import { NewSighting } from './components/NewSighting';
import { EditSighting } from './components/EditSighting';
import { Comments } from './components/Comments';
import { Navbar } from './components/Navbar';
import logo from "./logo.png";
import "./App.css";
import axios from 'axios';
import SightingPreview from "./components/SightingPreview";

const App = () => {
  const { sightingId } = useParams();
  // const [sighting, setSighting] = useState([]);
  // const [sightingIndex, setSightingIndex] = useState();

  // useEffect(() => {
  //   const getSightings = async () => {
  //     const data = await axios.get(`http://localhost:8000/sightings`);//location of the backend data

  //     console.log(data)
  //     setSighting(data.data)
  //   }
  //   getSightings()

  // }, []);



  return (
    <div className="App">
      <div className="centralized">
        {/* <div>{sighting.length !== 0 ? <div><p>{sighting[0].date}</p> <p>{sighting[0].location}</p><p>{sighting[0].notes}</p></div> : null}</div>
        <br />
        <hr />
        <div>{sighting.length !== 0 ? <div><p>{sighting[1].date}</p> <p>{sighting[1].location}</p><p>{sighting[1].notes}</p></div> : null}</div>
        <br />
        <hr />
        <div>{sighting.length !== 0 ? <div><p>{sighting[2].date}</p> <p>{sighting[2].location}</p><p>{sighting[2].notes}</p></div> : null}</div><br />
        <hr />
         */}
        <Navbar />
        <Routes >
          <Route path="/" element={<Home />} />
          {/*The path below is for GET request for ALL sightings */}
          <Route path="/sightings" element={<Sightings />} />

          {/*The path below is for GET request for individual sighting */}
          <Route path="/sightings/sightingpreview/:sightingId" element={<SightingPreview />} />

          {/*The pathe below is for POST request for a new sighting */}
          <Route path="/newsighting" element={<NewSighting />} />
          {/* <Route path="/editsighting" element={<EditSighting />} /> */}

          {/*The path below is for PUT request */}
          <Route path="/sightings/editsighting/:sightingId" element={<EditSighting />} />

          {/*The path below for GET comments request */}
          <Route path="/sightings/:sightingId/comments" element={<Comments />} />

          {/* {
            sighting.map((sight) => {
              return (sighting.length !== 0 ? <div><p>{sight.date}</p> <p>{sight.location}</p><p>{sight.notes}</p><br />
                <hr /></div> : null)
            })
          } */}




        </Routes>


      </div>

    </div>
  )
}

export default App;
