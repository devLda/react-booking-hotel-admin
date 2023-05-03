import React from "react";

import { Grid, Container, Typography } from "@mui/material";

import { AppWidgetSummary, AppWebsiteVisits } from "../components/UI/dashboard";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Tổng thu nhập"
            total={5252}
            increase={2.5}
            title="so với tháng trước"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Tổng thu nhập"
            total={5252}
            increase={2.5}
            title="so với tháng trước"
            color="warning"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Tổng thu nhập"
            total={5252}
            increase={2.5}
            title="so với tháng trước"
            color="info"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            header="Tổng thu nhập"
            total={5252}
            increase={2.5}
            title="so với tháng trước"
            color="error"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Lượt truy cập trang web"
            subheader="(+43%) so với tháng trước"
            chartLabels={[
              "01/01/2023",
              "02/01/2023",
              "03/01/2023",
              "04/01/2023",
              "05/01/2023",
              "06/01/2023",
              "07/01/2023",
              "08/01/2023",
              "09/01/2023",
              "10/01/2023",
              "11/01/2023",
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
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
