/* eslint-disable react-hooks/exhaustive-deps */

import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Button, Select } from "../../components/UI/form";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { object, string } from "yup";
import { apiAddPhong, apiAllLP, apiGetPhong, apiUpdatePhong } from "../../api";
import Swal from "sweetalert2";
import path from "../../utils/path";
import axios from "axios";

const numberRegExp = /^\d+$/;

const userSchema = object({
  TenLoaiPhong: string().required("Tên loại phòng là trường bắt buộc"),
  SoPhong: string().required("Số phòng là trường bắt buộc"),
  Tang: string().required("Tầng là trường bắt buộc"),
  SoNguoi: string()
    .required("Số người là trường bắt buộc")
    .matches(numberRegExp, "Số người phải là số dương"),
  DienTich: string()
    .required("Diện tích là trường bắt buộc")
    .matches(numberRegExp, "Diện tích phải là số dương"),
  GiaPhong: string()
    .required("Giá phòng là trường bắt buộc")
    .matches(numberRegExp, "Giá phòng phải là số dương"),
});

const Create = (props) => {
  const { type } = props;
  const { _id } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const [option, setOption] = useState([]);

  const [optionSel, setOptionSel] = useState([]);

  const [imgPreview, setImgPreview] = useState([]);

  const navigate = useNavigate();

  const defaultValue = useRef();

  const getValue = () => {
    const allInput = document.querySelectorAll("input");
    const data = {};
    for (let item in allInput) {
      if (allInput[item].value) {
        if (allInput[item].type === "file") continue;
        data[`${allInput[item].name}`] = allInput[item].value;
      }
    }
    return data;
  };

  const addPhong = async (dataAdd) => {
    const response = await apiAddPhong(dataAdd);
    if (response.success) {
      console.log("res ", response);
      if (imgPreview.length > 0) {
        UploadImg(response.mes._id, imgPreview, true);
      } else {
        Swal.fire("Thành công", "Thêm mới phòng thành công", "success").then(
          () => {
            navigate(`/${path.PHONG}`);
          }
        );
      }
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const updatePhong = async (id, dataUpdate) => {
    const response = await apiUpdatePhong(id, dataUpdate);
    if (response.success) {
      console.log("res ", response);
      if (imgPreview.length > 0) {
        UploadImg(response.mes._id, imgPreview, false);
      } else {
        Swal.fire("Thành công", "Thêm mới phòng thành công", "success").then(
          () => {
            navigate(`/${path.PHONG}`);
          }
        );
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
          if (Object.keys(res).length > 0) {
            const dataAdd = {};
            dataAdd.IDLoaiPhong = res.TenLoaiPhong;
            dataAdd.MaPhong = res.SoPhong;
            dataAdd.Tang = res.Tang;
            dataAdd.SoNguoi = parseInt(res.SoNguoi);
            dataAdd.DienTich = parseInt(res.DienTich);
            dataAdd.GiaPhong = parseInt(res.GiaPhong);
            addPhong(dataAdd);
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
          if (Object.keys(res).length > 0) {
            const dataUpdate = {};
            dataUpdate.IDLoaiPhong = res.TenLoaiPhong;
            dataUpdate.MaPhong = res.SoPhong;
            dataUpdate.Tang = res.Tang;
            dataUpdate.SoNguoi = parseInt(res.SoNguoi);
            dataUpdate.DienTich = parseInt(res.DienTich);
            dataUpdate.GiaPhong = parseInt(res.GiaPhong);
            updatePhong(_id, dataUpdate);
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

  const UploadImg = async (_id, images, isCre) => {
    for (let i = 0; i < images.length; i++) {
      axios
        .post(`${path.URL_API}/phong/uploadimage`, {
          image: images[i],
          id: _id,
          isCre: isCre,
        })
        .then((res) => {
          Swal.fire(
            "Thành công",
            isCre ? "Tạo phòng thành công" : "Cập nhật phòng thành công",
            "success"
          ).then(() => {
            navigate(`/${path.PHONG}`);
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
    apiAllLP()
      .then((res) => {
        console.log("res ", res);
        const lp = res.data.map((item) => {
          return {
            id: item._id,
            title: item.TenLoaiPhong,
          };
        });
        setOption(lp);
      })
      .catch((err) => {
        console.log("err ", err);
      });

    if (type === "Edit") {
      apiGetPhong(_id)
        .then((res) => {
          console.log("res ", res);
          const phong = {
            TenLoaiPhong: res.mes.LoaiPhong,
            SoPhong: res.mes.MaPhong,
            Tang: res.mes.Tang,
            SoNguoi: res.mes.SoNguoi,
            DienTich: res.mes.DienTich,
            GiaPhong: res.mes.GiaPhong,
          };
          defaultValue.current = phong;
          setValue(phong);
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

  useEffect(() => {
    setError((pre) => {
      return { ...pre, TenLoaiPhong: "" };
    });
  }, [optionSel]);

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
          {type === "Edit" ? "Cập nhật phòng" : "Tạo phòng mới"}
        </Typography>

        <Button
          sx={{ fontSize: "28px", m: 2 }}
          text="&rarr;"
          onClick={(e) => {
            navigate(`/${path.PHONG}`);
          }}
          className="bg-green-600"
        />
      </Card>

      <Card>
        <Grid container spacing={2} padding={2}>
          <Grid item md={6}>
            <Select
              error={error.TenLoaiPhong}
              label="Tên loại phòng"
              name="TenLoaiPhong"
              options={option ? option : []}
              value={value.TenLoaiPhong ? value.TenLoaiPhong : ""}
              setChange={setOptionSel}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.SoPhong}
              name="SoPhong"
              label="Số phòng: "
              value={value.SoPhong ? value.SoPhong : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.Tang}
              name="Tang"
              label="Tầng: "
              value={value.Tang ? value.Tang : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.SoNguoi}
              name="SoNguoi"
              label="Số người: "
              value={value.SoNguoi ? value.SoNguoi : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.DienTich}
              name="DienTich"
              label="Diện tích: "
              value={value.DienTich ? value.DienTich : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.GiaPhong}
              name="GiaPhong"
              label="Giá phòng: "
              value={value.GiaPhong ? value.GiaPhong : ""}
            />
          </Grid>
          <Grid item md={12}>
            <p>Chọn file ảnh</p>
            <input
              type="file"
              name="images"
              multiple="true"
              onChange={ChangeImage}
            ></input>
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
