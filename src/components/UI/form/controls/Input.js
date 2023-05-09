import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Input(props) {
  const { name, label, value, error = null, type, helperText } = props;
  const [valueData, setValueData] = useState(value);

  // console.log(, valueData)

  useEffect(() => {
    setValueData(props.value);
  }, [props.value]);

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={valueData}
      type={type}
      fullWidth
      helperText={helperText}
      onChange={(e) => {
        setValueData(e.target.value);
        console.log(valueData)
      }}
      {...(error && { error: true, helperText: error })}
    />
  );
}
