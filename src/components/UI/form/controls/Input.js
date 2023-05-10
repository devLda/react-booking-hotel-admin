import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Input(props) {
  const { name, label, value, type, helperText, disable } = props;
  let { error = null } = props;
  const [valueData, setValueData] = useState(value);

  useEffect(() => {
    setValueData(props.value);
  }, [props.value]);

  return (
    <>
      <TextField
        disabled={disable ? true : false}
        variant="outlined"
        label={label}
        name={name}
        // error={!! hasError}
        value={valueData}
        type={type}
        fullWidth
        helperText={helperText}
        onChange={(e) => {
          setValueData(e.target.value);
        }}
        //   {...(((valueData === "" && error?.includes("là trường bắt buộc")) ||
        //     (valueData !== "" && !error?.includes("là trường bắt buộc"))) && {
        //     error: true,
        //     helperText: error,
        //   })
        // }
      />
      {((valueData === "" && error?.includes("là trường bắt buộc")) ||
        (valueData !== "" && !error?.includes("là trường bắt buộc"))) && (
        <label className="text-red-600 ml-2 mt-2 block">{error}</label>
      )}
    </>
  );
}
