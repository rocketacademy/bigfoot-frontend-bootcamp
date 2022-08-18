import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sighting() {
  let params = useParams();

  const [sighting, setSighting] = useState({});
  const [comment, setComment] = useState({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    callAPI();
    let index;
    console.log(sighting);
    console.log(comment.content);

    async function callAPI() {
      console.log("Calling API");
      console.log(params.sightingIndex);
      index = params.sightingIndex;
      const data = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/sightings/${index}`
      );
      console.log(data);

      setSighting(data.data);

      const commentData = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/sightings/${index}/comments`
      );
      console.log(commentData.data);

      setComment(commentData.data);
    }
  }, [comment.content, sighting, params.sightingIndex]);

  const deleteComment = async (id) => {
    const deleteSucces = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/sightings/${id}/comments`
    );
    console.log(deleteSucces);
    let newComments = comment.filter((comment) => comment.id !== id);
    console.log(newComments);
    setComment(newComments);
    console.log(";WTF");
  };

  return (
    <div>
      <h1>Sightings Single</h1>
      {sighting ? (
        <div
          key={sighting.id}
          style={{
            borderRadis: "25%",
            border: "solid 3px black",
            margin: "10px",
          }}
        >
          <h4>{new Date(sighting.date).toLocaleDateString()}</h4>
          <h5>{sighting.location}</h5>
          <h6>{sighting.notes}</h6>
        </div>
      ) : null}

      <h4>Add Comment</h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          let response = await axios.post(
            `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingIndex}/comments`,
            { content: newComment }
          );

          console.log(response); // respond with the data and concat it?
          let newComments = [...comment, response.data];
          setComment(newComments);
          setNewComment("");
        }}
      >
        <input
          type="text"
          value={newComment}
          placeholder="Add new comment"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>

      <h4>Comments:</h4>

      {comment && comment.length > 0 ? (
        comment.map((content) => (
          <div key={content.id}>
            <h5>
              Last updated: {new Date(content.updatedAt).toLocaleDateString()}
            </h5>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                let response = await axios.put(
                  `${process.env.REACT_APP_API_SERVER}/sightings/${params.sightingIndex}/comments`,
                  { content: newComment, id: content.id }
                );

                console.log(response); // respond with the data and concat it?
                let filtered = comment.filter((item) => item.id !== content.id);
                let newComments = [...filtered, response.data[0]];
                setComment(newComments);
                setNewComment("");
              }}
            >
              <input
                type="text"
                defaultValue={content.content}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <input type="submit" value="Edit" />
            </form>

            <button onClick={() => deleteComment(content.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}
