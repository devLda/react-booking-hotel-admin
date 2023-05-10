/* eslint-disable react-hooks/exhaustive-deps */

import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Select, Button, DatePicker } from "../../components/UI/form";
import api from "./config";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { object, string, number, date } from "yup";

const genderItems = [
  { id: "Female", title: "Nữ" },
  { id: "Male", title: "Nam" },
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userSchema = object({
  Username: string().required("Username là trường bắt buộc"),
  // Password: string()
  //   .required("Mật khẩu là trường bắt buộc")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Mật khẩu phải chứa tối thiểu 8 ký tự và có ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 ký tự đặc biệt và 1 số"
  //   ),
  HoVaTen: string().required("Họ và tên là trường bắt buộc"),
  SDT: string()
    .required("Số điện thoại là trường bắt buộc")
    .matches(phoneRegExp, "Không đúng định dạng số điện thoại"),
  Email: string()
    .required("Email là trường bắt buộc")
    .email("Không đúng định dạng email"),
  GioiTinh: string().nullable(),
  CCCD: number().nullable(),
  NgaySinh: date()
    .default(() => new Date())
    .nullable(),
});

const Create = (props) => {
  const { type } = props;
  const { id } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

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

  const handlePost = () => {
    let data = getValue();

    (async () => {
      const validationResult = await userSchema
        .validate(data, { abortEarly: false })
        .then((res) => {
          console.log("res ", res);
          setError({});
          if (Object.keys(res).length > 0) {
            api
              .addUser(data)
              .then((res) => {
                if (res.status === 200) {
                  window.location.href = "/dashboard/account";
                }
              })
              .catch((err) => {
                console.log("error ", err);
              });
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

    if (data) {
      api
        .updateUser(data, id)
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/dashboard/account";
          }
        })
        .catch((err) => {
          console.log("error ", err);
        });
    }
  };

  useEffect(() => {
    if (type === "Edit") {
      api
        .getUser({ Username: id })
        .then((res) => {
          setValue(res.data[0]);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }
  }, []);

  useLayoutEffect(() => {
    console.log("re-render");
  }, [error]);

  return (
    <>
      <Card
        sx={{
          mb: 5,
        }}
      >
        <Typography
          sx={{
            mx: 2,
            my: 2,
          }}
          variant="h3"
        >
          Create a new account
        </Typography>
      </Card>
      <Card>
        <Grid container spacing={2} padding={2}>
          <Grid item md={6}>
            <Input
              error={error.Username}
              disable={value.Username ? true : false}
              name="Username"
              label="Username: "
              value={value.Username ? value.Username : ""}
            />
          </Grid>
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
            <Input
              error={error.Email}
              name="Email"
              label="Email: "
              value={value.Email ? value.Email : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Select
              label="Giới tính "
              name="GioiTinh"
              options={genderItems}
              value={
                value.GioiTinh
                  ? "Male"
                  : value.GioiTinh === false
                  ? "Female"
                  : null
              }
            />
          </Grid>
          <Grid item md={6}>
            <Input
              name="CCCD"
              label="CCCD: "
              value={value.CCCD ? value.CCCD : ""}
            />
          </Grid>
          <Grid item md={6}>
            <DatePicker
              label="Ngày sinh"
              valueDefault={value.NgaySinh ? value.NgaySinh : null}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            my: 2,
            mx: 2,
          }}
          text={type === "Edit" ? "Update" : "Add"}
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
