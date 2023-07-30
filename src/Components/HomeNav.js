import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const HomeNav = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/sightings");
        }}
      >
        Sightings
      </Button>
      <br />
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          navigate("sightings/new");
        }}
      >
        Submit Sighting
      </Button>
    </div>
  );
};

export default HomeNav;
