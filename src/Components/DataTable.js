import React from "react";

export const DataTable = ({ data }) => {
  console.log("data is: ", data);

  return (
    <>
      <div className="h-[100%] overflow-y-auto">
        <table className="w-full border-collapse border-2 border-red-800 bg-slate-800">
          <thead className="border-b-2 border-slate-500">
            <tr className="pb-10">
              <th>Primary Key</th>
              <th>Location</th>
              <th>Notes</th>
              <th>Created At</th>
              <th>Updated At</th>

              {/* Add more header cells as needed */}
            </tr>
          </thead>
          <tbody className="border border-indigo-800">
            {data.map((item, listindex) => (
              <tr key={listindex}>
                <td className="text-center">{item.id}</td>
                <td>{item.location}</td>
                <td>{item.notes}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
