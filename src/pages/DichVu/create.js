/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable  no-useless-escape */

import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Button } from "../../components/UI/form";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiAddDV, apiGetDV, apiUpdateDV } from "../../api";

import { object, string, number } from "yup";
import Swal from "sweetalert2";
import path from "../../utils/path";

const userSchema = object({
  MaDichVu: string().required("Mã dịch vụ là trường bắt buộc"),
  TenDichVu: string().required("Tên dịch vụ là trường bắt buộc"),
  GiaDichVu: number()
    .typeError("Giá dịch vụ phải là một số")
    .moreThan(0, "Giá dịch vụ phải là số dương")
    .required("Giá dịch vụ là trường bắt buộc"),
});

const Create = (props) => {
  const { type } = props;
  const { MaDichVu } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const getValue = () => {
    const allInput = document.querySelectorAll("input");
    const data = {};
    for (let item in allInput) {
      if (allInput[item].value) {
        console.log("input ", allInput[item].name);
        data[`${allInput[item].name}`] = allInput[item].value;
      }
    }

    return data;
  };

  const createDV = async (dataCre) => {
    console.log("data", dataCre);
    const response = await apiAddDV(dataCre);
    if (response.success) {
      console.log("res ", response);
      Swal.fire("Thành công", "Thêm mới dịch vụ thành công", "success").then(
        () => {
          navigate(`/${path.DICHVU}`);
        }
      );
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const handlePost = async () => {
    let data = getValue();

    // console.log(data)

    (async () => {
      const validationResult = await userSchema
        .validate(data, { abortEarly: false })
        .then((res) => {
          console.log("res ", res);
          setError({});
          if (Object.keys(data).length > 0) {
            createDV(data);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      for (let i in validationResult?.inner) {
        if (validationResult?.inner[i].path) {
          err[validationResult?.inner[i].path] =
            validationResult?.inner[i].message;
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
      apiUpdateDV(data.MaDichVu, data)
        .then((res) => {
          console.log("res ", res);
          if (res.success) {
            Swal.fire(
              "Thành công",
              "Cập nhật dịch vụ thành công",
              "success"
            ).then(() => {
              navigate(`/${path.DICHVU}`);
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
      Swal.fire("Thành công", "Cập nhật dịch vụ thành công", "success");
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
      apiGetDV(MaDichVu)
        .then((res) => {
          // console.log('res ', res)
          setValue(res.data);
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
          {type === "Edit" ? "Cập nhật dịch vụ" : "Thêm dịch vụ mới"}
        </Typography>

        <Button
          sx={{ fontSize: "28px", my: 2 }}
          text="&rarr;"
          onClick={(e) => {
            navigate(`/${path.DICHVU}`);
          }}
          className="bg-green-600"
        />
      </Card>
      <Card>
        <Grid container spacing={2} padding={2}>
          <Grid item md={6}>
            <Input
              disable={value.MaDichVu ? true : false}
              error={error.MaDichVu}
              name="MaDichVu"
              label="Mã dịch vụ"
              value={value.MaDichVu ? value.MaDichVu : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.TenDichVu}
              name="TenDichVu"
              label="Tên dịch vụ"
              value={value.TenDichVu ? value.TenDichVu : ""}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              error={error.GiaDichVu}
              name="GiaDichVu"
              label="Giá dịch vụ"
              type="number"
              min="0"
              value={value.GiaDichVu ? value.GiaDichVu : ""}
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
