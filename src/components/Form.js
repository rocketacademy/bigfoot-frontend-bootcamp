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
            options={getUniqueValues(props.optionsLabel, "YEAR")}
            getOptionLabel={(label) => label.toString()}
            disablePortal
            id="combo-box-demo"
            // options={props.optionsLabel.YEAR} //insert options
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="YEAR" />}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={getUniqueValues(props.optionsLabel, "SEASON")}
            getOptionLabel={(label) => label.toString()}
            disablePortal
            id="combo-box-demo"
            // options={props.optionsLabel.YEAR} //insert options
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="SEASON" />}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={getUniqueValues(props.optionsLabel, "MONTH")}
            getOptionLabel={(label) => label.toString()}
            disablePortal
            id="combo-box-demo"
            // options={props.optionsLabel.YEAR} //insert options
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="MONTH" />}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={getUniqueValues(props.optionsLabel, "COUNTY")}
            getOptionLabel={(label) => label.toString()}
            disablePortal
            id="combo-box-demo"
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="COUNTY" />}
          />
        </Grid>
      </Grid>
    </form>
  );
}
