import React from "react";

export const SimpleTable = ({ sightingData }) => {
  // console.log("data is: ", data);
  // console.log(sightingData);

  return (
    <>
      <div className="h-[100%] overflow-y-auto">
        <table className="w-full  rounded-[1em]  border-collapse bg-slate-300">
          <thead className="border-b-[1px] border-slate-500 bg-">
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
          {sightingData === null ? null : (
            <tbody className="">
              <tr>
                <td className="text-center">{sightingData.id}</td>
                <td>{sightingData.location}</td>
                <td>{sightingData.notes}</td>
                <td>{sightingData.date}</td>
                <td>{sightingData.createdAt}</td>
                <td>{sightingData.updatedAt}</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};
