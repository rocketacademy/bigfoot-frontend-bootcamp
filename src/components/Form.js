import * as React from "react";
import { TextField, Autocomplete, Grid } from "@mui/material/";

export default function ComboBox(props) {
  function getUniqueValues(options, parameter) {
    //Error handling on undefined values
    const uniqueValues = [];
    options.forEach((option) => {
      const value = option[parameter];
      if (value !== undefined && !uniqueValues.includes(value)) {
        uniqueValues.push(value);
      }
    });
    return uniqueValues;
  }

  console.log(getUniqueValues(props.optionsLabel, "COUNTY"));

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs>
          <Autocomplete
            options={getUniqueValues(props.optionsLabel, "date")}
            getOptionLabel={(label) => label.toString()}
            disablePortal
            id="combo-box-demo"
            // options={props.optionsLabel.YEAR} //insert options
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Date" />}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={getUniqueValues(props.optionsLabel, "location")}
            getOptionLabel={(label) => label.toString()}
            disablePortal
            id="combo-box-demo"
            // options={props.optionsLabel.YEAR} //insert options
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={getUniqueValues(props.optionsLabel, "createdAt")}
            getOptionLabel={(label) => label.toString()}
            disablePortal
            id="combo-box-demo"
            // options={props.optionsLabel.YEAR} //insert options
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Posted Date" />}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={getUniqueValues(props.optionsLabel, "updatedAt")}
            getOptionLabel={(label) => label.toString()}
            disablePortal
            id="combo-box-demo"
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Updated Date" />}
          />
        </Grid>
      </Grid>
    </form>
  );
}
