// import { Card, Paper, Typography } from "@mui/material";

// import { Grid } from "@mui/material";
// import {
//   handleForm,
//   Form,
//   Input,
//   RadioGroup,
//   Select,
//   Checkbox,
//   // DatePicker,
//   Button,
// } from "../../components/UI/form";

// const genderItems = [
//   { id: false, title: "Female" },
//   { id: true, title: "Male" },
// ];

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

  const handleSubmit = (e) => {
    // e.preventDefault();
    //   if (validate()){
    //       // employeeService.insertEmployee(values)
    //       resetForm()
    //   }
  };

  return (
    <form method="POST" action="http://localhost:3300/api/user/add">
      <h1>Create a free account</h1>
      <fieldset>
        <legend>
          <h3>Account Details</h3>
        </legend>
        <div class="account-details">
          <div>
            <label>Username</label>
            <input type="text" name="Username" required />
          </div>
          <div>
            <label>Password*</label>
            <input type="password" name="Password" required />
          </div>
          <div>
            <label>HoVaTen</label>
            <input type="text" name="HoVaTen" required />
          </div>
          <div>
            <label>SDT</label>
            <input type="text" name="SDT" required />
          </div>
          <div>
            <label>Email</label>
            <input type="text" name="Email" required />
          </div>
          <div>
            <label>CCCD</label>
            <input type="text" name="CCCD" required />
          </div>
          <div>
            <label>GioiTinh</label>
            <select name="GioiTinh">
              <option value="True">Nam</option>
              <option value="False">Nữ</option>
            </select>
          </div>
        </div>
      </fieldset>
      <button type="submit" href="/">
        Submit
      </button>
    </form>
  );

  // return (
  //   <>
  //     <Card
  //       sx={{
  //         mb: 5,
  //       }}
  //     >
  //       <Typography
  //         sx={{
  //           mx: 2,
  //           my: 2,
  //         }}
  //         variant="h3"
  //       >
  //         Create a new account
  //       </Typography>
  //     </Card>
  //     <Card>
  //       <Form method="post" action="http://localhost:3300/api/user/">
  //         <Grid container spacing={2} padding={2}>
  //           <Grid item md={6}>
  //             <Input name="Username" label="Username: " />
  //           </Grid>
  //           <Grid item md={6}>
  //             <Input name="Password" label="Password: " />
  //           </Grid>
  //           <Grid item md={6}>
  //             <Input name="HoVaTen" label="Họ và tên: " />
  //           </Grid>
  //           <Grid item md={6}>
  //             <Input name="SDT" label="Số điện thoại: " />
  //           </Grid>
  //           <Grid item md={6}>
  //             <Input name="Email" label="Email: " />
  //           </Grid>
  //           <Grid item md={6}>
  //             <Select
  //               label="Giới tính "
  //               name="GioiTinh"
  //               options={genderItems}
  //             />
  //           </Grid>
  //           <Grid item md={6}>
  //             <Input name="CCCD" label="CCCD: " />
  //           </Grid>
  //         </Grid>
  //         <Button
  //           sx={{
  //             my: 2,
  //             mx: 2,
  //           }}
  //           text="Submit"
  //           type="submit"
  //         />
  //       </Form>
  //     </Card>
  //   </>
  // );
};

export default create;
