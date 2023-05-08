import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
} from "../../components/UI/form";

const genderItems = [
  { id: "Female", title: "Female" },
  { id: "Male", title: "Male" },
];

const create = () => {
  // const validate = (fieldValues = values) => {
  //     let temp = { ...errors }
  //     if ('fullName' in fieldValues)
  //         temp.fullName = fieldValues.fullName ? "" : "This field is required."
  //     if ('email' in fieldValues)
  //         temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
  //     if ('mobile' in fieldValues)
  //         temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
  //     if ('departmentId' in fieldValues)
  //         temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
  //     setErrors({
  //         ...temp
  //     })

  //     if (fieldValues == values)
  //         return Object.values(temp).every(x => x == "")
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //     if (validate()){
  //         // employeeService.insertEmployee(values)
  //         resetForm()
  //     }
  // };

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
        <Form method="post" action="http://localhost:3300/api/user/add">
          <Grid container spacing={2} padding={2}>
            <Grid item md={6}>
              <Input name="Username" label="Username: " />
            </Grid>
            <Grid item md={6}>
              <Input name="Password" label="Password: " type="password" />
            </Grid>
            <Grid item md={6}>
              <Input name="HoVaTen" label="Họ và tên: " />
            </Grid>
            <Grid item md={6}>
              <Input name="SDT" label="Số điện thoại: " />
            </Grid>
            <Grid item md={6}>
              <Input name="Email" label="Email: " />
            </Grid>
            <Grid item md={6}>
              <Select
                label="Giới tính "
                name="GioiTinh"
                options={genderItems}
              />
            </Grid>
            <Grid item md={6}>
              <Input name="CCCD" label="CCCD: " />
            </Grid>
            <Grid item md={6}>
              <Input
                name="NgaySinh"
                label="Ngày Sinh: "
                type="date"
                value={null}
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              my: 2,
              mx: 2,
            }}
            text="Submit"
            type="submit"
          />
        </Form>
      </Card>
    </>
  );
};

export default create;
