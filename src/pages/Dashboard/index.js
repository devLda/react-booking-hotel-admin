import React, { useEffect, useState } from "react";

import { Grid, Container, Typography } from "@mui/material";

import {
  AppWidgetSummary,
  AppWebsiteVisits,
  AppOrderTimeline,
} from "../../components/UI/dashboard";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
import { apiCountDP } from "../../api";
import { LoadingData } from "../../components/UI/loading";
import moment from "moment";

const vnd = 23000;

const formatMoney = (tien) => {
  let moneyFormat = "";
  const arrMoney = [];
  while (tien > 0) {
    if (tien % 1000 === 0) {
      arrMoney.push(tien % 1000);
      tien = tien / 1000;
    } else {
      arrMoney.push(tien % 1000);
      tien = Math.floor(tien / 1000);
    }
  }

  for (let i = arrMoney.length - 1; i >= 0; i--) {
    if (i === arrMoney.length - 1) {
      moneyFormat += arrMoney[i] + ".";
      continue;
    }

    if (arrMoney[i] > 99) {
      moneyFormat += arrMoney[i];
    }
    if (9 < arrMoney[i] && arrMoney[i] < 100) {
      moneyFormat += arrMoney[i] + "0";
    }
    if (arrMoney[i] < 10) {
      moneyFormat += arrMoney[i] + "00";
    }

    if (i > 0) {
      moneyFormat += ".";
    }
  }
  return moneyFormat;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [statical, setStatical] = useState({});

  const isLogged = JSON.parse(localStorage.getItem("persist:admin/login"));

  if (isLogged.isLoggedIn === "false") navigate(`/${path.LOGIN}`);

  // useEffect(() => {
  //   dispatch(getAllUser())
  //     .then((res) => {
  //       console.log("res ", res);
  //       if (res.payload.mes === "AccessToken không hợp lệ") {
  //         Swal.fire(
  //           "Thông báo",
  //           "Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại",
  //           "info"
  //         ).then(() => {
  //           window.location.href = "/login";
  //         });
  //       } else {
  //         setListAcc(res.payload);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err ", err);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    apiCountDP()
      .then((res) => {
        console.log("ré ", res);
        setStatical(res);
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }, []);

  if (Object.keys(statical).length === 0) {
    return <LoadingData />;
  }
  const orderline = [];

  const title = statical?.orderline?.map((ele) => {
    orderline.push(ele.createdAt);
    return `${ele.ThongTinKH.TenKH} đã đặt phòng ${ele.Phong.MaPhong}`;
  });

  const chartLabel = statical?.chartLabel;
  const chartValue = statical?.chartValue;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Tổng quan
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Tổng thu nhập"
            total={
              statical?.total
                ? formatMoney(statical?.total * vnd) + " đ"
                : 0 + " đ"
            }
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Đơn đặt tháng"
            total={statical?.donthang + " đơn"}
            color="warning"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Tổng khách hàng"
            total={statical?.khthang + " khách"}
            color="info"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Thu nhập ngày"
            total={
              statical?.totalthang
                ? formatMoney(statical?.totalthang * vnd) + " đ"
                : 0 + " đ"
            }
            color="error"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Lượt khách đặt phòng"
            subheader="7 ngày gần nhất"
            chartLabels={chartLabel}
            chartData={[
              {
                name: "Đơn đặt",
                type: "column",
                fill: "solid",
                data: chartValue,
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Mốc thời gian đặt phòng"
            list={[...Array(5)].map((_, index) => ({
              title: title[index],
              type: `order${index + 1}`,
              time: moment(orderline[index]),
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
