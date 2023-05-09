import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import {
  Form,
  Input,
  Select,
  // DatePicker,
  Button,
} from "../../components/UI/form";
import api from "./config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const genderItems = [
  { id: "Female", title: "Nữ" },
  { id: "Male", title: "Nam" },
];

const Create = (props) => {
  const { type } = props;
  const { id } = useParams();
  const [value, setValue] = useState({});
  useEffect(() => {
    if (type === "Edit") {
      api
        .getUser({ Username: id })
        .then((res) => {
          console.log("res ", res);
          setValue(res.data[0]);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }
  }, []);
  console.log("value ", value);
  console.log("id ", id);

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
        <Form
          method={type === "Edit" ? "PUT" : "POST"}
          action={
            type === "Edit"
              ? `http://localhost:3300/api/user/${value.Username}`
              : "http://localhost:3300/api/user/add"
          }
        >
          <Grid container spacing={2} padding={2}>
            <Grid item md={6}>
              <Input
                name="Username"
                label="Username: "
                value={value.Username ? value.Username : ""}
              />
            </Grid>
            <Grid item md={6}>
              <Input name="Password" label="Password: " type="password" />
            </Grid>
            <Grid item md={6}>
              <Input
                name="HoVaTen"
                label="Họ và tên: "
                value={value.HoVaTen ? value.HoVaTen : ""}
              />
            </Grid>
            <Grid item md={6}>
              <Input
                name="SDT"
                label="Số điện thoại: "
                value={value.SDT ? value.SDT : ""}
              />
            </Grid>
            <Grid item md={6}>
              <Input
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
              <Input name="CCCD" label="CCCD: " />
            </Grid>
            <Grid item md={6}>
              <Input
                name="NgaySinh"
                helperText="Nhập hoặc chọn Ngày Sinh"
                type="date"
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              my: 2,
              mx: 2,
            }}
            text={type === "Edit" ? "Update" : "Add"}
            type="submit"
          />
        </Form>
      </Card>
    </>
  );
};

export default Create;
