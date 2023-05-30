import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import FileHeader from "../../components/FileHeader/FileHeader";
import CommentsDisplay from "../../components/CommentsDisplay/CommentsDisplay";
import "./Sighting.css";
import ComposerComment from "../../components/Composer/ComposerComment";

const Sighting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentComposer, setCommentComposer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const getData = await axios.get(BACKEND_URL + "/sightings/" + id);
      setData(getData.data);
    };
    const fetchComments = async () => {
      const getComments = await axios.get(
        BACKEND_URL + "/sightings/" + id + "/comments"
      );
      setComments(getComments.data);
    };
    fetchData();
    fetchComments();
  }, [id]);

  const handleClick = (e) => {
    const target = e.target.id;
    if (target === "back") {
      navigate("/");
    } else if (target === "previous") {
      const targetId = Number(id) - 1;
      navigate("/sightings/" + targetId);
    } else if (target === "next") {
      const targetId = Number(id) + 1;
      navigate("/sightings/" + targetId);
    }
  };

  if (data !== null && comments !== null) {
    return (
      <div id="sightings">
        {commentComposer && (
          <ComposerComment
            setCommentComposer={setCommentComposer}
            setComments={setComments}
            sightingId={id}
          />
        )}
        <div className="sightings-header">
          <h5>Bigfoot Casefiles</h5>
          <button onClick={handleClick} id="back">
            Home 🏠
          </button>
        </div>
        <div className="sightings-content">
          <FileHeader data={data} />
          <br />
          <p className="sightings-content-notes">{data.notes}</p>
          <CommentsDisplay
            comments={comments}
            setCommentComposer={setCommentComposer}
          />
        </div>
        <div className="sightings-navigate">
          {id > 1 ? (
            <button onClick={handleClick} id="previous">
              ⇦ Previous Case
            </button>
          ) : (
            <div id="previous" />
          )}
          {id < 466 && (
            <button onClick={handleClick} id="next">
              Next Case ⇨
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default Sighting;
