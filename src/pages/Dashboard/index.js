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
// import { getAllUser } from "../../store/user/asyncAction";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
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
    // console.log("coolkie ", document.cookie);
    apiCountDP()
      .then((res) => {
        console.log("res ", res);
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
            total={statical?.total[0]?.total_tongtien + " $"}
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
              statical?.totalthang[0]?.total_tongtien
                ? statical?.totalthang[0]?.total_tongtien
                : 0 + " $"
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
              // id: faker.datatype.uuid(),
              title: title[index],
              type: `order${index + 1}`,
              time: new moment(orderline[index]),
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
