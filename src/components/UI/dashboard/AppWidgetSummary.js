// @mui
// import PropTypes from 'prop-types';
// import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// utils
import { fCurrency, fPercent } from '../../Utils/formatNumber';

const AppWidgetSummary = ({ total, increase, title, color = 'primary', sx, ...other }) => {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h4">Total Earning</Typography>

      <Typography variant="h3">{fCurrency(total)}</Typography>

      <Typography variant="h4">+ {fPercent(increase)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  )
}

export default AppWidgetSummary