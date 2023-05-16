/* eslint-disable react-hooks/exhaustive-deps */

import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Button } from "../../components/UI/form";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { object, string } from "yup";
import { apiAddLP } from "../../api";
import Swal from "sweetalert2";

const userSchema = object({
  TenLoaiPhong: string().required("Tên loại phòng là trường bắt buộc"),
  MoTa: string().required("Mô tả là trường bắt buộc"),
});

const Create = (props) => {
  const { type } = props;
  const { TenLoaiPhong } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const [imgPreview, setImgPreview] = useState([]);

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

  const addLoaiPhong = async (dataAdd) => {
    const response = await apiAddLP(dataAdd);
    console.log(response);
  };

  const handlePost = () => {
    const data = getValue();

    data.image = imgPreview;

    (async () => {
      const validationResult = await userSchema
        .validate(data, { abortEarly: false })
        .then((res) => {
          console.log("res ", res);
          setError({});
          if (Object.keys(data).length > 0) {
            addLoaiPhong(data);
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
    let files = e.target.files;
    if (!files) Swal.fire("Thông Tin", "Bạn chưa chọn ảnh", "info");
    else {
      if (files.length > 3) {
        Swal.fire("Thông Tin", "Chỉ được chọn tối đa 3 ảnh", "info");
        // files.slice(0, 3).forEach((element) => {
        //   setFileToBase(element);
        // });
        console.log(files);
      }

      if (files.length >= 2 && files.length <= 3) {
        for (let file = 0; file < files.length; file++) {
          setImgPreview([]);
          setFileToBase(files[file]);
        }
      }

      if (files.length === 1) {
        setImgPreview([]);
        setFileToBase(files[0]);
      }
    }
    // setFileToBase(file);
    // setImgPreview(file);
  };

  const setFileToBase = (file) => {
    console.log("file ", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview((pre) => [...pre, reader.result]);
    };
  };

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

  useEffect(() => {
    return () => {
      imgPreview && URL.revokeObjectURL(imgPreview);
    };
  }, [imgPreview]);

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
          <Grid item md={12}>
            <p>Chọn file ảnh</p>
            <input
              type="file"
              name="image"
              multiple="true"
              onChange={ChangeImage}
            ></input>
            {/* {imgPreview === 1 && (
              <img className="w-40" src={imgPreview} alt="Preview" />
            )} */}
            <div className="my-5">
              {imgPreview?.length > 0 &&
                imgPreview.map((item) => (
                  <img
                    className="w-40 inline-block mx-5"
                    src={item}
                    alt="Preview"
                  />
                ))}
            </div>
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
