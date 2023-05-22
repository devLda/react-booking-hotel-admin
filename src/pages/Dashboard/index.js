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
import { getAllUser } from "../../store/user/asyncAction";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const temp = statical.orderline.map((ele) => {
    return `${ele.ThongTinKH.TenKH} đã đặt phòng ${ele.Phong.MaPhong}`;
  });

  const orderline = temp.slice(-5);

  console.log("order ", orderline);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Tổng thu nhập"
            total={statical?.total[0].total_tongtien + " $"}
            increase={2.5}
            title="so với tháng trước"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Đơn đặt tháng"
            total={statical?.donthang + " đơn"}
            increase={2.5}
            title="so với tháng trước"
            color="warning"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Tổng khách hàng"
            total={statical?.khthang + " khách"}
            increase={2.5}
            title="so với tháng trước"
            color="info"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Thu nhập tháng"
            total={statical?.totalthang[0].total_tongtien + " $"}
            increase={2.5}
            title="so với tháng trước"
            color="error"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Lượt khách đặt phòng"
            subheader="(+43%) so với tháng trước"
            chartLabels={[
              "06/01/2022",
              "07/01/2022",
              "08/01/2022",
              "09/01/2022",
              "10/01/2022",
              "11/01/2022",
              "12/01/2022",
              "01/01/2023",
              "02/01/2023",
              "03/01/2023",
              "04/01/2023",
            ]}
            chartData={[
              {
                name: "Khách truy cập",
                type: "line",
                fill: "solid",
                data: [44, 55, 41, 67, 45, 43, 64, 52, 59, 36, 45],
              },
              {
                name: "Khách đăng ký tài khoản",
                type: "area",
                fill: "gradient",
                data: [30, 25, 28, 30, 22, 35, 21, 41, 56, 27, 43],
              },
              {
                name: "Khách đặt phòng",
                type: "column",
                fill: "solid",
                data: [16, 15, 17, 14, 15, 12, 12, 16, 14, 15, 20],
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Mốc thời gian đặt phòng"
            list={[...Array(5)].map((_, index) => ({
              // id: faker.datatype.uuid(),
              title: orderline[index],
              type: `order${index + 1}`,
              time: new Date(),
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
