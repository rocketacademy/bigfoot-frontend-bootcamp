import "./CommentsDisplay.css";
import "../../App.css";

const CommentsDisplay = ({ comments, setCommentComposer }) => {
  let commentsFeed;

  if (comments.length !== 0) {
    commentsFeed = comments.map((comment, index) => {
      let date = comment.createdAt;
      return (
        <div className="comment" key={index}>
          <p>{comment.content}</p>
          <h6>{comment.commentor}</h6>
          <h6>{new Date(date).toDateString()}</h6>
        </div>
      );
    });
  } else {
    commentsFeed = (
      <div className="comment">
        <p>No Comments</p>
      </div>
    );
  }

  return (
    <div id="comments-display">
      <h5>Comments</h5>
      {commentsFeed}
      <button className="comments-add" onClick={() => setCommentComposer(true)}>
        Add Comment
      </button>
    </div>
  );
};

export default CommentsDisplay;
