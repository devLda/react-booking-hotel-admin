import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { useState, useEffect } from "react";

export default function Select(props) {
  const { name, label, value, error = null, options } = props;
  const [valueData, setValueData] = useState(value);
  console.log("value ", value);
  useEffect(() => {
    setValueData(props.value);
  }, [props.value]);

  return (
    <FormControl variant="outlined" fullWidth {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={valueData}
        onChange={(e) => {
          setValueData(e.target.value);
        }}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
