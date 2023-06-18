/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable  no-useless-escape */

import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Select, Button } from "../../components/UI/form";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiCreateUser, apiGetUser, apiUpdateUser } from "../../api/user";

import { object, string } from "yup";
import Swal from "sweetalert2";
import path from "../../utils/path";

const optionItems = [
  { id: "admin", title: "admin" },
  { id: "user", title: "user" },
];

const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const userSchema = object({
  Email: string()
    .required("Email là trường bắt buộc")
    .email("Email phải chứa ký tự '@' và dấu '.'"),
  Password: string()
    .required("Mật khẩu là trường bắt buộc")
    .matches(
      passRegex,
      "Mật khẩu phải chứa tối thiểu 8 ký tự và có ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 ký tự đặc biệt và 1 số"
    ),
  HoVaTen: string().required("Họ và tên là trường bắt buộc"),
  SDT: string()
    .required("Số điện thoại là trường bắt buộc")
    .matches(phoneRegExp, "Số điện thoại gồm 10 số có nhập chữ số 0 ở đầu"),
});

const Create = (props) => {
  const { type } = props;
  const { Email } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const navigate = useNavigate();

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

  const createAcc = async (dataCre) => {
    const response = await apiCreateUser(dataCre);
    if (response.success) {
      console.log("res ", response);
      Swal.fire("Thành công", response.mes, "success").then(() => {
        navigate(`/${path.ACCOUNT}`);
      });
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const handlePost = async () => {
    let data = getValue();

    (async () => {
      const validationResult = await userSchema
        .validate(data, { abortEarly: false })
        .then((res) => {
          console.log("res ", res);
          setError({});
          if (Object.keys(data).length > 0) {
            createAcc(data);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      for (let i in validationResult.inner) {
        if (validationResult.inner[i].path) {
          err[validationResult.inner[i].path] =
            validationResult.inner[i].message;
        }
      }
      setError(err);
    })();
  };

  const handlePut = (e) => {
    let data = getValue();

    console.log(data);

    let equal = deepEqual(data, defaultValue.current);
    if (!equal) {
      apiUpdateUser(data.Email, data)
        .then((res) => {
          console.log("res ", res);
          if (res.success) {
            Swal.fire(
              "Thành công",
              "Cập nhật tài khoản thành công",
              "success"
            ).then(() => {
              navigate(`/${path.ACCOUNT}`);
            });
          } else Swal.fire("Thất bại", res.mes, "error");
        })
        .catch((err) => {
          console.log("err ", err);
        });
      // api
      //   .updateUser(data, id)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       window.location.href = "/dashboard/account";
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("error ", err);
      //   });
    } else {
      Swal.fire("Thành công", "Cập nhật tài khoản thành công", "success");
    }
  };

  function deepEqual(obj1, obj2) {
    // If both objects are the same instance, they are equal
    if (obj1 === obj2) {
      return true;
    }

    // Check if the objects are of the same type and have the same number of properties
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 === null ||
      obj2 === null ||
      Object.keys(obj1).length !== Object.keys(obj2).length
    ) {
      return false;
    }

    // Recursively compare each property and value
    for (let prop in obj1) {
      if (!obj2.hasOwnProperty(prop) || !deepEqual(obj1[prop], obj2[prop])) {
        return false;
      }
    }

    return true;
  }

  const defaultValue = useRef();

  useEffect(() => {
    if (type === "Edit") {
      apiGetUser(Email)
        .then((res) => {
          // console.log('res ', res)
          const { createdAt, updatedAt, __v, ...valueRef } = res.mes;
          defaultValue.current = valueRef;
          setValue(res.mes);
        })
        .catch((err) => {
          console.log("err ", err);
        });
      // api
      //   .getUser({ Username: id })
      //   .then((res) => {
      //     setValue(res.data[0]);
      //   })
      //   .catch((err) => {
      //     console.log("err ", err);
      //   });
    }
  }, [type]);

  useLayoutEffect(() => {
    console.log("re-render");
  }, [error]);

  return (
    <>
      <Card
        sx={{
          mb: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            mx: 2,
            my: 2,
          }}
          variant="h3"
        >
          {type === "Edit" ? "Cập nhật tài khoản" : "Tạo tài khoản mới"}
        </Typography>

        <Button
          sx={{ fontSize: "28px", my: 2 }}
          text="&rarr;"
          onClick={(e) => {
            navigate(`/${path.ACCOUNT}`);
          }}
          className="bg-green-600"
        />
      </Card>

      <Card>
        <Grid container spacing={2} padding={2}>
          <Grid item md={6}>
            <Input
              disable={value.Email ? true : false}
              error={error.Email}
              name="Email"
              label="Email: "
              value={value.Email ? value.Email : ""}
            />
          </Grid>
          {type !== "Edit" && (
            <Grid item md={6}>
              <Input
                error={error.Password}
                name="Password"
                label="Password: "
                type="password"
                value={value.Password ? value.Password : ""}
              />
            </Grid>
          )}
          <Grid item md={6}>
            <Input
              error={error.HoVaTen}
              name="HoVaTen"
              label="Họ và tên: "
              value={value.HoVaTen ? value.HoVaTen : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.SDT}
              name="SDT"
              label="Số điện thoại: "
              value={value.SDT ? value.SDT : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Select
              label="Quyền"
              name="Role"
              options={optionItems}
              value={
                value.Role === "admin"
                  ? "admin"
                  : value.Role === "user"
                  ? "user"
                  : null
              }
              setChange={false}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            my: 2,
            mx: 2,
          }}
          text={type === "Edit" ? "Cập nhật" : "Thêm mới"}
          onClick={(e) => {
            if (type === "Edit") {
              handlePut(e);
            } else {
              handlePost(e);
            }
          }}
          className="bg-green-600"
        />
      </Card>
    </>
  );
};

export default Create;
