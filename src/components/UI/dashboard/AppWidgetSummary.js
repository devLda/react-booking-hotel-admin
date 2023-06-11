// @mui
// import PropTypes from 'prop-types';
// import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from "@mui/material";

// utils
import { fPercent } from "../../Utils/formatNumber";

const AppWidgetSummary = ({
  header,
  total,
  increase,
  title,
  color = "primary",
  sx,
  ...other
}) => {
  return (
    <Card
      sx={{
        py: 5,
        px: 4,
        boxShadow: 0,
        textAlign: "left",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h4">{header}</Typography>

      <Typography variant="h3">
        {total}
        <Typography
          sx={{
            display: "inline",
            color: ` ${color === "error" ? "red" : "#7BB31A"} `,
          }}
        >
          {fPercent(increase)}
        </Typography>
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          opacity: 0.3,
          color: "#111111",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

export default AppWidgetSummary;
