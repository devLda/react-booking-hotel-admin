/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, Typography, Grid } from "@mui/material";

import { Input, Button, Select } from "../../components/UI/form";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import moment from "moment";

import { apiCreateDP, apiAllPhong, apiGetDP, apiUpdateDP } from "../../api";
import Swal from "sweetalert2";
import path from "../../utils/path";
import { object, string } from "yup";

const DPSchema = object({
  Phong: string().required("Phòng là trường bắt buộc"),
  TenKH: string().required("Tên khách hàng là trường bắt buộc"),
  SDT: string().required("Số điện thoại là trường bắt buộc"),
  Email: string().required("Email là trường bắt buộc"),
});

const Create = (props) => {
  const dateRef = useRef();

  const { type } = props;
  const { id } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const [phong, setPhong] = useState([]);

  const [option, setOption] = useState([]);

  const [optionSel, setOptionSel] = useState([]);

  const [openDate, setOpenDate] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [lichDat, setLichDat] = useState([]);

  const navigate = useNavigate();

  const getValue = () => {
    const allInput = document.querySelectorAll("input");
    const data = {};
    for (let item in allInput) {
      if (allInput[item].value) {
        // let date = "";
        if (allInput[item].type === "file") continue;
        // if (allInput[item].value.includes("/")) {
        //   let dayData = allInput[item].value.split("/");
        //   date = dayData[2] + "-" + dayData[1] + "-" + dayData[0];
        //   data["NgaySinh"] = date;
        //   continue;
        // }
        data[`${allInput[item].name}`] = allInput[item].value;
      }
    }
    console.log("daa ", data);
    return data;
  };

  const addDP = async (dataAdd) => {
    const response = await apiCreateDP(dataAdd);
    if (response.success) {
      console.log("res ", response);
      Swal.fire("Thành công", response.mes, "success").then(() => {
        navigate(`/${path.DATPHONG}`);
      });
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const updateDP = async (id, data) => {
    const response = await apiUpdateDP(id, data);
    if (response.success) {
      console.log("res ", response);
      Swal.fire("Thành công", response.mes, "success").then(() => {
        navigate(`/${path.DATPHONG}`);
      });
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const handlePost = () => {
    const data = getValue();

    console.log("dates ", dates);

    (async () => {
      const validationResult = await DPSchema.validate(data, {
        abortEarly: false,
      })
        .then((res) => {
          setError({});
          if (Object.keys(res).length > 0) {
            res.NgayBatDau = moment(dates[0].startDate).format("DD-MM-YYYY");
            res.NgayKetThuc = moment(dates[0].endDate).format("DD-MM-YYYY");
            res.TongNgay = moment(dates[0].endDate).diff(
              moment(dates[0].startDate),
              "days"
            );
            console.log("res ", res);
            addDP(res);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      console.log("errl ", validationResult);
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
    const data = getValue();

    (async () => {
      const validationResult = await DPSchema.validate(data, {
        abortEarly: false,
      })
        .then((res) => {
          console.log("res ", res);
          setError({});
          if (Object.keys(res).length > 0) {
            res.NgayBatDau = moment(dates[0].startDate).format("DD-MM-YYYY");
            res.NgayKetThuc = moment(dates[0].endDate).format("DD-MM-YYYY");
            updateDP(id, data);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      if (validationResult)
        for (let i in validationResult.inner) {
          if (validationResult.inner[i].path) {
            err[validationResult.inner[i].path] =
              validationResult.inner[i].message;
          }
        }
      console.log("er ", err);
      setError(err);
    })();
  };

  var getDaysBetweenDates = function (startDate, endDate) {
    var now = moment(startDate, "DD-MM-YYYY"),
      dates = [];
    var end = moment(endDate, "DD-MM-YYYY");

    while (now.isSameOrBefore(end)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  };

  const getToday = () => {
    const now = new Date();
    const year = now.getFullYear() + "";
    const month =
      now.getMonth() < 10
        ? "0" + (now.getMonth() + 1)
        : "" + (now.getMonth() + 1);
    const date = now.getDate() < 10 ? "0" + now.getDate() : "" + now.getDate();
    return `${date}-${month}-${year}`;
  };

  const getLichDat = (LichDat) => {
    const today = getToday();
    setLichDat([]);
    if (LichDat.length > 0) {
      LichDat.forEach((item) => {
        if (
          moment(today, "DD-MM-YYYY").isBefore(
            moment(item?.NgayBatDau, "DD-MM-YYYY")
          )
        ) {
          var dateList = getDaysBetweenDates(
            item?.NgayBatDau,
            item?.NgayKetThuc
          );
          console.log("dl ", dateList);
          dateList.forEach((item) => {
            if (!lichDat.toString().includes(new Date(item).toString())) {
              setLichDat((pre) => {
                const date = new Date(item);
                return [...pre, date];
              });
            }
          });
        }
      });
    }
  };
  useEffect(() => {
    apiAllPhong()
      .then((res) => {
        console.log("resp ", res);
        const opt = res.data.map((item) => {
          return {
            id: item._id,
            title: item.MaPhong,
          };
        });
        setOption(opt);
        setPhong(res.data);
      })
      .catch((err) => console.log("errp ", err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateRef, dates]);

  useEffect(() => {
    setError({});
    const lich = phong?.filter(
      (item) => item?._id?.toString() === optionSel?.toString()
    );
    getLichDat(lich?.length > 0 ? lich[0].LichDat : []);
  }, [optionSel]);

  useEffect(() => {
    if (type === "Edit") {
      apiGetDP(id)
        .then((res) => {
          console.log("res ", res);
          const arrBD = res.NgayBatDau.split("-");
          const arrKT = res.NgayKetThuc.split("-");
          const ngayBD = arrBD[2] + "-" + arrBD[1] + "-" + arrBD[0];
          const ngayKT = arrKT[2] + "-" + arrKT[1] + "-" + arrKT[0];

          const data = {};
          data.Phong = res.Phong;
          data.TenKH = res.ThongTinKH.TenKH;
          data.SDT = res.ThongTinKH.SDT;
          data.Email = res.ThongTinKH.Email;
          setValue(data);
          setDates([
            {
              startDate: new Date(ngayBD),
              endDate: new Date(ngayKT),
              key: "selection",
            },
          ]);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }
  }, [type]);

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
          {type === "Edit" ? "Cập nhật đơn đặt phòng" : "Tạo đơn đặt phòng mới"}
        </Typography>

        <Button
          sx={{ fontSize: "28px", m: 2 }}
          text="&rarr;"
          onClick={(e) => {
            navigate(`/${path.DATPHONG}`);
          }}
          className="bg-green-600"
        />
      </Card>
      <Card>
        <Grid container spacing={2} paddingTop={4} paddingX={2}>
          <Grid item md={6} marginBottom={2}>
            <Select
              error={error.Phong}
              label="Phòng"
              name="Phong"
              options={option ? option : []}
              value={value.Phong ? value.Phong : ""}
              setChange={setOptionSel}
            />
          </Grid>

          <Grid item md={6} marginBottom={2}>
            <div
              ref={dateRef}
              className="flex h-full items-center gap-3 relative"
            >
              <i class="fa-solid fa-calendar-days text-slate-300"></i>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="text-slate-300 cursor-pointer text-lg"
              >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDates([item.selection]);
                  }}
                  dateDisplayFormat="dd/MM/yyyy"
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="absolute -top-6 left-60 z-10 shadow-2xl"
                  minDate={new Date()}
                  disabledDates={lichDat}
                />
              )}
            </div>
          </Grid>

          <Grid item md={6} marginBottom={2}>
            <Input
              error={error.TenKH}
              name="TenKH"
              label="Tên khách hàng "
              value={value.TenKH ? value.TenKH : ""}
            />
          </Grid>
          <Grid item md={6} marginBottom={2}>
            <Input
              error={error.SDT}
              name="SDT"
              label="Số điện thoại "
              value={value.SDT ? value.SDT : ""}
            />
          </Grid>
          <Grid item md={6} marginBottom={2}>
            <Input
              error={error.Email}
              name="Email"
              label="Email "
              value={value.Email ? value.Email : ""}
            />
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
