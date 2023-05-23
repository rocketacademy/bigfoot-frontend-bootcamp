import { Container, Typography } from "@mui/material";
import React from "react";
import SightingComposer from "../components/molecules/SightingComposer";

function NewSighting() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h2" color={"primary"}>
                Seen a Bigfoot?
            </Typography>
            <Typography variant="h5">Let us know! 🔍</Typography>
            <SightingComposer />
        </Container>
    );
}

export default NewSighting;
