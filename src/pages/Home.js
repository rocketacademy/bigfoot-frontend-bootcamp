import { useNavigate } from "react-router-dom";

const Home = (data) => {
  let buttons;
  let incomingData = data.data;
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/sightings/" + e.target.id);
  };

  if (incomingData) {
    buttons = incomingData.map((element, index) => (
      <button
        key={index}
        id={index}
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
      <div className="buttons">{buttons}</div>
    </div>
  );
};

export default Home;
