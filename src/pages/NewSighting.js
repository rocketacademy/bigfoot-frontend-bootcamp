import { Button, Container, Typography } from "@mui/material";
import React from "react";
import SightingComposer from "../components/molecules/SightingComposer";
import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

function NewSighting() {
  return (
    <Container maxWidth="sm">
      <Link to={"/"}>
        <Button sx={{ mt: 2 }} startIcon={<ArrowBack />} variant="outlined">
          Back
        </Button>
      </Link>
      <Typography variant="h2" color={"primary"}>
        Seen a Bigfoot?
      </Typography>
      <Typography variant="h5">Let us know! 🔍</Typography>
      <SightingComposer />
    </Container>
  );
}

export default NewSighting;
