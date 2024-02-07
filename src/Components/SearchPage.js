import React from "react";
import { Container } from "@mui/material";

export default function SearchPage(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;

    if (isNaN(query)) {
      props.setSearchParams({ state: query });
    } else {
      props.setSearchParams({ year: query });
    }
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <input type="search" name="search"></input>
          <input type="submit" value="Search"></input>
        </form>
      </Container>
    </div>
  );
}
