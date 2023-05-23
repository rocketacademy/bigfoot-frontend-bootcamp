import React, { useContext, useState } from "react";
import { postsPerPage } from "../constants";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { SightingsContext } from "../contexts/SightingsProvider";
import { Link, useNavigate } from "react-router-dom";
import { CurrentPageContext } from "../contexts/CurrentPageProvider";

function Home() {
  const sightingsContext = useContext(SightingsContext);
  const currentPageContext = useContext(CurrentPageContext);

  const navigate = useNavigate();

  // if (sightingsContext.sightings.length === 0) return <p>Loading...</p>;

  const lastPostIndex = currentPageContext.currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = sightingsContext?.sightings?.slice(
    firstPostIndex,
    lastPostIndex
  );

  const handlePageChange = (e, page) => {
    currentPageContext.setCurrentPage(page);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" color={"primary"}>
        BIGFOOT
      </Typography>
      <Typography variant="h2" color={"primary"}>
        SIGHTINGS 🦍
      </Typography>
      <Link to="/new">
        <Button variant="outlined">New Sighting</Button>
      </Link>
      {currentPosts.map((post) => {
        return (
          <Box
            key={post.id}
            onClick={() => navigate(`/sightings/${post.id}`)}
            p={2}
            m={1}
            border={1}
          >
            Case #{post.id ?? "NULL"}
          </Box>
        );
      })}
      <Stack direction="row" alignItems={"center"} justifyContent={"center"}>
        <Pagination
          color="primary"
          page={currentPageContext.currentPage}
          count={Math.ceil(sightingsContext.sightings?.length / postsPerPage)}
          onChange={handlePageChange}
        ></Pagination>
      </Stack>
    </Container>
  );
}

export default Home;
