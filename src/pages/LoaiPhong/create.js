/* eslint-disable react-hooks/exhaustive-deps */

import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Button } from "../../components/UI/form";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { object, string } from "yup";

const userSchema = object({
  TenLoaiPhong: string().required("Tên loại phòng là trường bắt buộc"),
  MoTa: string().required("Mô tả là trường bắt buộc"),
});

const Create = (props) => {
  const { type } = props;
  const { TenLoaiPhong } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const files = useRef()

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
    const data = getValue();

    // (async () => {
    //   const validationResult = await userSchema
    //     .validate(data, { abortEarly: false })
    //     .then((res) => {
    //       console.log("res ", res);
    //       setError({});
    //       if (Object.keys(data).length > 0) {
    //         // api
    //         //   .addLP(data)
    //         //   .then((res) => {
    //         //     if (res.status === 200) {
    //         //       console.log("res data ", res);
    //         //       // window.location.href = "/dashboard/loaiphong";
    //         //     }
    //         //   })
    //         //   .catch((err) => {
    //         //     console.log("error ", err);
    //         //   });
    //       }
    //     })
    //     .catch((err) => {
    //       return err;
    //     });
    //   let err = {};
    //   for (let i in validationResult.inner) {
    //     if (validationResult.inner[i].path) {
    //       err[validationResult.inner[i].path] =
    //         validationResult.inner[i].message;
    //     }
    //   }
    //   setError(err);
    // })();
  };

  const handlePut = (e) => {
    let data = getValue();

    if (data) {
      // api
      //   .updateUser(data, id)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       window.location.href = "/dashboard/loaiphong";
      //     }
      //   })
      //   .catch((err) => {
      //     console.log("error ", err);
      //   });
    }
  };

  const ChangeImage = (e) => {
    let file = e
    console.log('file ', file)
  }

  useEffect(() => {
    if (type === "Edit") {
      // api
      //   .getUser({ TenLoaiPhong: id })
      //   .then((res) => {
      //     setValue(res.data[0]);
      //   })
      //   .catch((err) => {
      //     console.log("err ", err);
      //   });
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
          Tạo loại phòng mới
        </Typography>
      </Card>
      <Card>
        <Grid container spacing={2} padding={2}>
          <Grid item md={6}>
            <Input
              error={error.TenLoaiPhong}
              disable={value.TenLoaiPhong ? true : false}
              name="TenLoaiPhong"
              label="Tên loại phòng: "
              value={value.TenLoaiPhong ? value.TenLoaiPhong : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.MoTa}
              name="MoTa"
              label="Mô tả: "
              value={value.MoTa ? value.MoTa : ""}
            />
          </Grid>
          <Grid item md={6}>
            <label>Chọn file ảnh</label>
            <input type="file" name="image" onChange={ChangeImage}></input>
          </Grid>
        </Grid>
        <Button
          sx={{
            my: 2,
            mx: 2,
          }}
          text={type === "Edit" ? "Cập nhật" : "Thêm"}
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
