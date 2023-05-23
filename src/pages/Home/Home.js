import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import "./Home.css";
import FileHeader from "../../components/FileHeader/FileHeader";
import FilterTab from "../../components/FilterTab";
import { sortAlphabetically } from "../../utils";

const Home = () => {
  const [links, setLinks] = useState(null);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);
  const [buttonList, setButtonList] = useState(<></>);
  const [searchParams] = useSearchParams();
  const filterQuery = searchParams.get("filter");
  const navigate = useNavigate();

  const fetchLinks = async () => {
    const getLinks = await axios.get(BACKEND_URL + "/sightings");
    setLinks(getLinks.data);
  };

  const fetchFilteredLinks = async () => {
    const getLinks = await axios.get(
      BACKEND_URL + "/sightings?filter=" + filter
    );
    setLinks(getLinks.data);
  };

  useEffect(() => {
    if (filterQuery) {
      setFilter(filterQuery);
    }
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("useEffect filter");
    if (filter) {
      if (filter === "All") {
        fetchLinks();
      } else {
        fetchFilteredLinks();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (links && sort) {
      setLinks(sortAlphabetically(links, sort));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    if (filter) {
      navigate(`/?filter=${filter}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort]);

  useEffect(() => {
    if (links) {
      let buttons = links.map((element, index) => (
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
      setButtonList(buttons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);

  const handleClick = (e) => {
    if (e.currentTarget.id.includes("filter")) {
      const selectedFilter = e.currentTarget.id.split("-")[1];
      setFilter(selectedFilter);
      setSort(null);
    } else if (e.currentTarget.id.includes("sort")) {
      const sortBy = e.currentTarget.id.split("-")[1];
      setSort(sortBy);
    } else {
      navigate("/sightings/" + e.currentTarget.id);
    }
  };

  return (
    <div id="home">
      <div className="home-header">
        <h1>Bigfoot Casefiles</h1>
        <h1>👣</h1>
      </div>
      <div className="options">
        <button
          id="sort-REPORT_CLASS"
          onClick={handleClick}
          style={{ color: "#000000" }}
        >
          Sort:Type
        </button>
        <div className="filters">
          <FilterTab filter="All" handleClick={handleClick} />
          <FilterTab filter="Spring" handleClick={handleClick} />
          <FilterTab filter="Summer" handleClick={handleClick} />
          <FilterTab filter="Fall" handleClick={handleClick} />
          <FilterTab filter="Winter" handleClick={handleClick} />
        </div>
      </div>
      <div className="buttons">{buttonList}</div>
    </div>
  );
};

export default Home;
