import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import "../App.css";

export default function SightingPage() {
  const params = useParams();
  const id = params.sightingId;
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [content, setContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const takeSightings = async () => {
      try {
        const sightingData = await axios.get(`${BACKEND_URL}/sightings/${id}`);
        console.log(id);
        const sightingInfo = sightingData.data;

        setSighting(sightingInfo);

        setCategories(sightingInfo.categories);

        const commentData = await axios.get(
          `${BACKEND_URL}/sightings/${id}/comments`
        );
        const commentInfo = commentData.data;
        setComments(commentInfo);
      } catch (error) {
        console.error(error);
      }
    };
    takeSightings();
  }, [id]);

  const categoriesList = categories.map((category) => (
    <span>{category.name} </span>
  ));

  let sightingMoreInfo = null;
  if (sighting) {
    sightingMoreInfo = (
      <div>
        <Card className="page-layout">
          <CardContent>
            <Typography>{sighting.location}</Typography>
            <Typography>{sighting.date}</Typography>
            <Typography>{sighting.notes}</Typography>
            <Typography>Categories: {categoriesList}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  let commentsList = null;
  if (comments) {
    commentsList = comments.map((comment) => {
      return (
        <Card>
          <CardContent>
            <Typography variant="body2">{comment.content}</Typography>
          </CardContent>
        </Card>
      );
    });
  }

  const handleAdd = async () => {
    try {
      const sightingData = await axios
        .post(`${BACKEND_URL}/sightings/${id}/comments`, {
          content: content,
        })
        .then((res) => {
          setContent("");
          return axios.get(`${BACKEND_URL}/sightings/${id}/comments`);
        })
        .then((res) => {
          setComments(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Entry #{id}</h3>
        </div>
        <div className="page-layout">{sighting && sightingMoreInfo}</div>
        <div>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            label="Content"
          ></TextField>
          <Button onClick={handleAdd}>Submit</Button>
        </div>
        <div className="page-layout">{comments && commentsList}</div>
      </header>
    </div>
  );
}
