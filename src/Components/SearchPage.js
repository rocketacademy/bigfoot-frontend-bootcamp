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
      <p className="query">
        Make your query either by year or by the name of a US state.{" "}
      </p>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            size="35"
            className="input"
            placeholder="Enter a year/state name"
          ></input>
          <input type="submit" value="Search" className="input"></input>
        </form>
      </Container>
    </div>
  );
}
