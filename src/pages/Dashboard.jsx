import React from "react";

import { Grid, Container, Typography } from "@mui/material";

import {
  AppWidgetSummary
} from '../components/UI/dashboard'

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            total={5252}
            increase = {2.5}
            title="Conpared to last month"
            icon={"ant-design:android-filled"}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            total={5252}
            increase = {2.5}
            title="Conpared to last month"
            icon={"ant-design:android-filled"}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            total={5252}
            increase = {2.5}
            title="Conpared to last month"
            icon={"ant-design:android-filled"}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <AppWidgetSummary
            total={5252}
            increase = {2.5}
            title="Conpared to last month"
            icon={"ant-design:android-filled"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
