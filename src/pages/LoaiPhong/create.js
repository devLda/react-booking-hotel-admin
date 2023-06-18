/* eslint-disable react-hooks/exhaustive-deps */

import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Button } from "../../components/UI/form";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { object, string } from "yup";
import { apiAddLP, apiGetLP, apiUpdateLP } from "../../api";
import Swal from "sweetalert2";
import path from "../../utils/path";
import axios from "axios";

const userSchema = object({
  TenLoaiPhong: string().required("Tên loại phòng là trường bắt buộc"),
  TienNghi: string().required("Tiện nghi là trường bắt buộc"),
});

const Create = (props) => {
  const { type } = props;
  const { TenLoaiPhong } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const [imgPreview, setImgPreview] = useState([]);

  const navigate = useNavigate();

  const defaultValue = useRef();

  const getValue = () => {
    const allInput = document.querySelectorAll("input");
    const data = {};
    for (let item in allInput) {
      if (allInput[item].value) {
        let date = "";
        if (allInput[item].type === "file") continue;
        if (allInput[item].value.includes("/")) {
          let dayData = allInput[item].value.split("/");
          date = dayData[2] + "-" + dayData[1] + "-" + dayData[0];
          data["NgaySinh"] = date;
          continue;
        }
        data[`${allInput[item].name}`] = allInput[item].value;
      }
    }

    const textarea = document.querySelector("textarea");
    data["MoTa"] = textarea.value;
    return data;
  };

  const addLoaiPhong = async (dataAdd) => {
    const response = await apiAddLP(dataAdd);
    if (response.success) {
      if (imgPreview.length > 0) {
        UploadImg(response.mes.TenLoaiPhong, imgPreview, true);
      } else {
        Swal.fire(
          "Thành công",
          "Thêm mới loại phòng thành công",
          "success"
        ).then(() => {
          navigate(`/${path.LOAIPHONG}`);
        });
      }
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const updateLoaiPhong = async (dataUpdate) => {
    const response = await apiUpdateLP(dataUpdate.TenLoaiPhong, dataUpdate);
    if (response.success) {
      console.log("res ", response);
      if (imgPreview.length > 0) {
        UploadImg(response.mes.TenLoaiPhong, imgPreview, false);
      } else {
        Swal.fire(
          "Thành công",
          "Cập nhật loại phòng thành công",
          "success"
        ).then(() => {
          navigate(`/${path.LOAIPHONG}`);
        });
      }
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const handlePost = () => {
    const data = getValue();

    // data.image = imgPreview;

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

  // function deepEqual(obj1, obj2) {
  //   // If both objects are the same instance, they are equal
  //   if (obj1 === obj2) {
  //     return true;
  //   }

  //   // Check if the objects are of the same type and have the same number of properties
  //   if (
  //     typeof obj1 !== "object" ||
  //     typeof obj2 !== "object" ||
  //     obj1 === null ||
  //     obj2 === null ||
  //     Object.keys(obj1).length !== Object.keys(obj2).length
  //   ) {
  //     return false;
  //   }

  //   // Recursively compare each property and value
  //   for (let prop in obj1) {
  //     if (!obj2.hasOwnProperty(prop) || !deepEqual(obj1[prop], obj2[prop])) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  const handlePut = (e) => {
    const data = getValue();

    (async () => {
      const validationResult = await userSchema
        .validate(data, { abortEarly: false })
        .then((res) => {
          console.log("res ", res);
          setError({});
          if (Object.keys(data).length > 0) {
            updateLoaiPhong(data);
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

  const UploadImg = async (TenLoaiPhong, images, isCre) => {
    for (let i = 0; i < images.length; i++) {
      axios
        .post(`${path.URL_API}/loaiphong/uploadimage`, {
          image: images[i],
          TenLoaiPhong: TenLoaiPhong,
          isCre: isCre,
        })
        .then((res) => {
          Swal.fire(
            "Thành công",
            isCre
              ? "Tạo loại phòng thành công"
              : "Cập nhật loại phòng thành công",
            "success"
          ).then(() => {
            navigate(`/${path.LOAIPHONG}`);
          });
        })
        .catch((err) => {
          Swal.fire("Thất bại", err.message, "error");
        });
    }
  };

  const ChangeImage = (e) => {
    let files = e.target.files;

    if (!files) Swal.fire("Thông Tin", "Bạn chưa chọn ảnh", "info");
    else {
      if (files.length > 3) {
        Swal.fire("Thông Tin", "Chỉ được chọn tối đa 3 ảnh", "info");
        let count = 0;
        for (let file = 0; file < 3; file++) {
          if (files[file].size > 100000) {
            ++count;
            continue;
          }
          setImgPreview([]);
          setFileToBase(files[file]);
        }
        if (count > 0) {
          Swal.fire("Thông Tin", "Ảnh có kích thước quá lớn", "info");
        }
        console.log(files);
      }

      if (files.length >= 2 && files.length <= 3) {
        let count = 0;
        for (let file = 0; file < files.length; file++) {
          if (files[file].size > 100000) {
            ++count;
            continue;
          }
          setImgPreview([]);
          setFileToBase(files[file]);
        }

        if (count > 0) {
          Swal.fire("Thông Tin", "Ảnh có kích thước quá lớn", "info");
        }
      }

      if (files.length === 1) {
        if (files[0].size < 100000) {
          setImgPreview([]);
          setFileToBase(files[0]);
        } else {
          Swal.fire("Thông Tin", "Ảnh có kích thước quá lớn", "info");
        }
      }
    }
  };

  const setFileToBase = (file) => {
    console.log("file ", file.size);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview((pre) => [...pre, reader.result]);
    };
  };

  useEffect(() => {
    if (type === "Edit") {
      apiGetLP(TenLoaiPhong)
        .then((res) => {
          console.log("res ", res);
          const { createdAt, updatedAt, __v, ...valueRef } = res.mes;
          defaultValue.current = valueRef;
          setValue(res.mes);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }
  }, []);

  useEffect(() => {
    return () => {
      imgPreview &&
        imgPreview.forEach((ele) => {
          URL.revokeObjectURL(ele);
        });
    };
  }, [imgPreview]);

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
          {type === "Edit" ? "Cập nhật loại phòng" : "Tạo loại phòng mới"}
        </Typography>

        <Button
          sx={{ fontSize: "28px", m: 2 }}
          text="&rarr;"
          onClick={(e) => {
            navigate(`/${path.LOAIPHONG}`);
          }}
          className="bg-green-600"
        />
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
              error={error.TienNghi}
              name="TienNghi"
              label="Tiện nghi: "
              helperText="Nhập tiện nghi cách nhau bằng dấu ','"
              value={value.TienNghi ? value.TienNghi : ""}
            />
          </Grid>
          <Grid item md={12}>
            <p>
              <label for="MoTa">Nhập mô tả</label>
            </p>
            <textarea
              id="MoTa"
              className="p-3 border-2 border-solid border-slate-300"
              name="MoTa"
              rows={4}
              cols={50}
            ></textarea>
          </Grid>
          <Grid item md={12}>
            <p>Chọn file ảnh</p>
            <input
              type="file"
              name="images"
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
