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
  const [errorMes, setErrorMes] = useState(error)
  useEffect(() => {
    setValueData(value);
    setErrorMes(error)
  }, [value]);
  console.log('errr ', error)

  return (
    <FormControl variant="outlined" fullWidth {...(error && { error: errorMes ? true : false })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={valueData}
        onChange={(e) => {
          setErrorMes(null)
          setChange(e.target.value)
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
      {errorMes && <FormHelperText>{errorMes}</FormHelperText>}
    </FormControl>
  );
}
