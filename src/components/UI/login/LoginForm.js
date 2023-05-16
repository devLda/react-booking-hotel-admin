import { useState } from "react";
// @mui
import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../iconify";
import { apiLogin } from "../../../api/user";
import { login } from "../../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import path from "../../../utils/path";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const getValue = () => {
    const allInput = document.querySelectorAll("input");
    const data = {};
    for (let item in allInput) {
      if (allInput[item].value) {
        let date = "";
        if (allInput[item].value.includes("/")) {
          let dayData = allInput[item].value.split("/");
          date = dayData[2] + "-" + dayData[1] + "-" + dayData[0];
          data["NgaySinh"] = date;
          continue;
        }
        data[`${allInput[item].name}`] = allInput[item].value;
      }
    }
    return data;
  };

  const handleClick = async () => {
    const data = getValue();
    const response = await apiLogin(data);
    if (response.success) {
      dispatch(
        login({
          isLoggedIn: true,
          token: response.accessToken,
          userData: response.userData,
        })
      );
      Swal.fire("Thành công", "Đăng nhập thành công", "success").then(() => {
        navigate(`/${path.DASHBOARD}`);
      });
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="Email" label="Email address" />

        <TextField
          name="Password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        className="bg-green-600 mt-6"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        Login
      </LoadingButton>
    </>
  );
}
