import React from "react";
import { NavLink, Link } from "react-router-dom";
import { LinkWrapper } from "./LinkWrapper";

export const DataTable = ({ data }) => {
  // console.log("data is: ", data);

  return (
    <>
      <div className="h-[100%] overflow-y-auto">
        <table className="w-full rounded-[1em] border-collapse bg-slate-300">
          <thead className="border-b-[2px] border-slate-400 ">
            <tr className="pb-10">
              <th>Primary Key</th>
              <th>Location</th>
              <th>Notes</th>
              <th>Sighting Date</th>
              <th>Created At</th>
              <th>Updated At</th>

              {/* Add more header cells as needed */}
            </tr>
          </thead>
          <tbody className="">
            {data.map((item, listindex) => (
              <tr key={listindex} className="border">
                <td className="text-center">
                  <LinkWrapper sightingid={item.id}>{item.id}</LinkWrapper>
                </td>
                <td>
                  <LinkWrapper sightingid={item.id}>
                    {item.location}
                  </LinkWrapper>
                </td>
                <td>
                  <LinkWrapper sightingid={item.id}>{item.notes}</LinkWrapper>
                </td>
                <td>
                  <LinkWrapper sightingid={item.id}>{item.date}</LinkWrapper>
                </td>
                <td>
                  <LinkWrapper sightingid={item.id}>
                    {item.createdAt}
                  </LinkWrapper>
                </td>
                <td>
                  <LinkWrapper sightingid={item.id}>
                    {item.updatedAt}
                  </LinkWrapper>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
