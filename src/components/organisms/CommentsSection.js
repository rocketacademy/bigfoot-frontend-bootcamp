import {
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentComposer from "../molecules/CommentComposer";
import getUnixTime from "date-fns/getUnixTime";

function CommentsSection() {
  const { sightingId } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `http://localhost:3000/sightings/${sightingId}/comments`
      );
      setComments(data.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [update]);

  if (isLoading) return <CircularProgress />;

  return (
    <Stack spacing={2} pt={5}>
      <Typography variant="h4" color="primary">
        Comments
      </Typography>
      <CommentComposer sightingId={sightingId} setUpdate={setUpdate} />
      {comments.length === 0 && (
        <Typography variant="body1">No comments yet.</Typography>
      )}
      {comments
        .sort(
          (a, b) =>
            getUnixTime(new Date(b.createdAt)) -
            getUnixTime(new Date(a.createdAt))
        )
        .map((comment) => {
          return (
            <Paper key={comment.id} sx={{ p: 2 }}>
              <Typography variant="body1">{comment.content}</Typography>
              <Typography variant="overline">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </Typography>
            </Paper>
          );
        })}
    </Stack>
  );
}

export default CommentsSection;
