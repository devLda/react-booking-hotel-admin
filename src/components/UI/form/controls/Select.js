import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { useState, useEffect } from "react";

export default function Select(props) {
  const { name, label, value, setChange, error = null, options } = props;
  const [valueData, setValueData] = useState(value);
  // const [errorMes, setErrorMes] = useState(error)
  useEffect(() => {
    setValueData(value);
    // setErrorMes(error)
  }, [value]);
  return (
    <FormControl
      variant="outlined"
      fullWidth
      {...(error && { error: error ? true : false })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={valueData}
        onChange={(e) => {
          // setErrorMes(null)
          if (setChange) setChange(e.target.value);
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
