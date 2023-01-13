import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "./constants.js";

export default function CallSightings() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    console.log(BACKEND_URL);
    axios
      .get(`${BACKEND_URL}/sightings`)
      .then((response) => {
        setSightings(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Year</TableCell>
          <TableCell>Month</TableCell>
          <TableCell>Season</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Observed</TableCell>
          <TableCell>View More</TableCell>
        </TableRow>
      </TableHead>
      {sightings.map(({ YEAR, MONTH, SEASON, LOCATION, OBSERVED }, index) => {
        return (
          <TableBody key={index}>
            <TableRow>
              <TableCell>{YEAR}</TableCell>
              <TableCell> {MONTH}</TableCell>
              <TableCell>{SEASON}</TableCell>
              <TableCell>{LOCATION}</TableCell>
              <TableCell>{OBSERVED}</TableCell>
              <TableCell>
                <Link to={`${index}`}>View More</Link>
              </TableCell>
            </TableRow>
          </TableBody>
        );
      })}
    </Table>
  );
}
