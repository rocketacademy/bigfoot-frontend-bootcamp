import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import "./Home.css";

const Home = () => {
  const [links, setLinks] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const getLinks = await axios.get(BACKEND_URL + "links");
      setLinks(getLinks.data);
    };
    fetchLinks();
  }, []);

  useEffect(() => {
    if (filter) {
      const fetchFilteredLinks = async () => {
        const getLinks = await axios.get(
          BACKEND_URL + "links?filter=" + filter
        );
        setLinks(getLinks.data);
      };
      fetchFilteredLinks();
    }
  }, [filter]);

  let buttons;
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (e.target.id.includes("filter")) {
      const selectedFilter = e.target.id.split("-")[1];
      setFilter(selectedFilter);
    } else {
      navigate("/sightings/" + e.target.id);
    }
  };

  if (links) {
    buttons = links.map((element, index) => (
      <button
        key={element.INDEX}
        id={element.INDEX}
        className="casefile-link"
        onClick={handleClick}
        style={{ zIndex: index }}
      >
        <p>Report No: {element.REPORT_NUMBER}</p>
        <h3>{element.YEAR}</h3>
      </button>
    ));
  }
  return (
    <div id="home">
      <div className="home-header">
        <h1>Bigfoot Casefiles</h1>
        <h1>👣</h1>
      </div>
      <div className="filters">
        <button onClick={handleClick} className="spring" id="filter-Spring">
          Spring
        </button>
        <button onClick={handleClick} className="summer" id="filter-Summer">
          Summer
        </button>
        <button onClick={handleClick} className="fall" id="filter-Fall">
          Fall
        </button>
        <button onClick={handleClick} className="winter" id="filter-Winter">
          Winter
        </button>
      </div>
      <div className="buttons">{buttons}</div>
    </div>
  );
};

export default Home;
