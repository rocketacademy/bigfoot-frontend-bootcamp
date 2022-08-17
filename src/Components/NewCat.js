import axios from "axios";
import { useState } from "react";

export default function NewCat() {
  const [newCat, setNewCat] = useState("");

  return (
    <div>
      <h1>Create New Sighting Category Below!</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          let response = await axios.post(
            `${process.env.REACT_APP_API_SERVER}/categories`,
            {
              name: newCat,
            }
          );
          console.log(response.data);
        }}
      >
        <label>Weather</label>

        <input
          type="text"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder="Input new category"
        />
        <br />

        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
