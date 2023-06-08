import { Box, Card, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChiTiet = () => {
  const { id } = useParams();
  const { hoadon } = useSelector((state) => state.hoadon);

  const CTHD = useRef(
    hoadon.filter((hd) => hd?._id?.toString() === id.toString())[0]
  );

  console.log(CTHD.current);
  return (
    <>
      <Card
        sx={{
          mb: 5,
        }}
      >
        <Typography
          sx={{
            mx: 2,
            my: 2,
          }}
          variant="h3"
        >
          {"Chi tiết hóa đơn"}
        </Typography>
      </Card>

      <Card
        sx={{
          mb: 5,
        }}
      >
        <Typography
          sx={{
            mx: 2,
            mb: 0,
            mt: 4
          }}
          variant="h5"
        >
          {`Mã hóa đơn: ${CTHD.current._id}`}
        </Typography>

        <Box
          sx={{
            my: 2,
            mx: 2,
          }}
        >
          <Typography
            sx={{
              my: 2,
            }}
            variant="h5"
          >
            {`Thông tin đơn đặt`}
          </Typography>
          <Box
            sx={{
              mx: 2,
            }}
          >
            <Typography>
              <b>Mã đơn đặt:</b> {CTHD.current?.DatPhong?._id}
            </Typography>
            <Typography>
              <b>Ngày nhận phòng:</b> {CTHD.current?.DatPhong?.NgayBatDau}
            </Typography>
            <Typography>
              <b>Ngày trả phòng:</b> {CTHD.current?.DatPhong?.NgayKetThuc}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ChiTiet;
