import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import "./Home.css";
import FileHeader from "../../components/FileHeader/FileHeader";
import FilterTab from "../../components/filterTab";

const Home = () => {
  const [links, setLinks] = useState(null);
  const [filter, setFilter] = useState(null);

  const fetchLinks = async () => {
    const getLinks = await axios.get(BACKEND_URL + "sightings");
    setLinks(getLinks.data);
  };

  const fetchFilteredLinks = async () => {
    const getLinks = await axios.get(
      BACKEND_URL + "sightings?filter=" + filter
    );
    setLinks(getLinks.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (filter) {
      if (filter === "All") {
        fetchLinks();
      } else {
        fetchFilteredLinks();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  let buttons;
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (e.currentTarget.id.includes("filter")) {
      const selectedFilter = e.currentTarget.id.split("-")[1];
      setFilter(selectedFilter);
    } else {
      navigate("/sightings/" + e.currentTarget.id);
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
        <FileHeader data={element} />
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
        <FilterTab filter="All" handleClick={handleClick} />
        <FilterTab filter="Spring" handleClick={handleClick} />
        <FilterTab filter="Summer" handleClick={handleClick} />
        <FilterTab filter="Fall" handleClick={handleClick} />
        <FilterTab filter="Winter" handleClick={handleClick} />
      </div>
      <div className="buttons">{buttons}</div>
    </div>
  );
};

export default Home;
