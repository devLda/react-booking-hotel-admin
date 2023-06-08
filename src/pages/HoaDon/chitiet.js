import { Container, Box, Card, Typography, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import path from "../../utils/path";

const ChiTiet = () => {
  const { id } = useParams();
  const { hoadon } = useSelector((state) => state.hoadon);
  const navigate = useNavigate();

  const [daTra, setDaTra] = useState(0);
  const CTHD = useRef(
    hoadon?.filter((hd) => hd?._id?.toString() === id.toString())[0]
  );

  console.log(CTHD.current);

  return (
    <Container>
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
          {"Chi tiết hóa đơn"}
        </Typography>

        <Button
          sx={{ fontSize: "28px" }}
          onClick={(e) => {
            navigate(`/${path.HOADON}`);
          }}
        >
          &rarr;
        </Button>
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
            mt: 4,
          }}
          variant="h5"
        >
          {`Mã hóa đơn: ${CTHD.current?._id}`}
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

        <Box
          sx={{
            my: 2,
            mx: 2,
          }}
        >
          <Typography
            sx={{
              mt: 4,
              mb: 2,
            }}
            variant="h5"
          >
            {`Thông tin khách hàng`}
          </Typography>
          <Box
            sx={{
              mx: 2,
            }}
          >
            <Typography>
              <b>Mã khách hàng:</b> {CTHD.current?.ThongTinKH?._id}
            </Typography>
            <Typography>
              <b>Tên khách hàng:</b> {CTHD.current?.ThongTinKH?.TenKH}
            </Typography>
            <Typography>
              <b>Email:</b> {CTHD.current?.ThongTinKH?.Email}
            </Typography>
            <Typography>
              <b>Số điện thoại:</b> {CTHD.current?.ThongTinKH?.SDT}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            my: 2,
            mx: 2,
          }}
        >
          <Typography
            sx={{
              mt: 4,
              mb: 2,
            }}
            variant="h5"
          >
            {`Thông tin giao dịch`}
          </Typography>

          <Box
            sx={{
              mx: 2,
            }}
          >
            <Typography>
              <b>Đã đặt cọc</b>
            </Typography>
            <Typography>
              <b>Mã giao dịch:</b> {CTHD.current?.GiaoDich[0]?.MaGD}
            </Typography>
            <Typography>
              <b>Ngày thanh toán:</b> {CTHD.current?.GiaoDich[0]?.NgayThanhToan}
            </Typography>
            <Typography>
              <b>Số tiền:</b> {CTHD.current?.GiaoDich[0]?.DaThanhToan}
            </Typography>
            <Typography>
              <b>Chưa thanh toán:</b>{" "}
              {parseFloat(CTHD.current?.TongTien) -
                parseFloat(CTHD.current?.GiaoDich[0]?.DaThanhToan)}
            </Typography>
          </Box>

          <Typography
            sx={{
              mx: 2,
            }}
          >
            <b>Tổng thanh toán:</b> {CTHD.current?.TongTien}
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default ChiTiet;
