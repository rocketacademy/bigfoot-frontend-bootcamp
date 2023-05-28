import { ArrowBack } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import format from "date-fns/format";
import CommentsSection from "../components/organisms/CommentsSection";

function Post() {
  const { sightingId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `http://localhost:3000/sightings/${sightingId}`
      );
      setPost(data.data);
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} py={2}>
        <Link to={"/"}>
          <Button startIcon={<ArrowBack />} variant="outlined">
            Back
          </Button>
        </Link>

        <Typography variant="h4" color="primary">
          Report Number #{post.id ?? "NIL"}
        </Typography>
        <Typography variant="body1">
          <strong>Date:</strong>{" "}
          {new Date(post.date).toLocaleString("en-SG") ?? "NIL"}
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> {post.location ?? "NIL"}
        </Typography>
        <Typography variant="body1">
          <b>Description:</b>
        </Typography>
        <Typography variant="body1">{post.notes ?? "NIL"}</Typography>
        <CommentsSection />
      </Stack>
    </Container>
  );
}

export default Post;
