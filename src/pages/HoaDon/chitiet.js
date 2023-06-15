import { Container, Box, Card, Typography, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import path from "../../utils/path";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import { apiUpdateTTHD } from "../../api";

const ChiTiet = () => {
  const { id } = useParams();
  const { hoadon } = useSelector((state) => state.hoadon);
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const CTHD = useRef(
    hoadon?.filter((hd) => hd?._id?.toString() === id.toString())[0]
  );

  console.log(CTHD.current);

  const handleSubmit = async (id) => {
    const response = await apiUpdateTTHD(id);

    if (response.success) {
      setOpenDialog(false);
      Swal.fire(
        "Thành công",
        "Hoá đơn đã được xác nhận thanh toán",
        "success"
      ).then(() => {
        navigate(`/${path.HOADON}`);
      });
    } else {
      setOpenDialog(false);
      Swal.fire("Thất bại", "Đã xảy ra lỗi", "error");
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

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
              position: "relative",
            }}
          >
            <Typography>
              {CTHD.current?.TrangThai === "Đã thanh toán" ? (
                <b>Đã thanh toán</b>
              ) : (
                <b>Đã đặt cọc</b>
              )}
            </Typography>
            {CTHD.current?.GiaoDich[0]?.DaThanhToan ? (
              <>
                <Typography>
                  <b>Lần giao dịch trực tuyến mới nhất</b>
                </Typography>
                <Typography>
                  <b>Mã giao dịch:</b>{" "}
                  {
                    CTHD.current?.GiaoDich[CTHD.current?.GiaoDich.length - 1]
                      ?.MaGD
                  }
                </Typography>
                <Typography>
                  <b>Ngày thanh toán:</b>{" "}
                  {CTHD.current?.TrangThai === "Đã thanh toán"
                    ? CTHD.current?.DatPhong?.NgayKetThuc
                    : CTHD.current?.GiaoDich[CTHD.current?.GiaoDich.length - 1]
                        ?.NgayThanhToan}
                </Typography>
                <Typography>
                  <b>Số tiền:</b>{" "}
                  {CTHD.current?.TrangThai === "Đã thanh toán"
                    ? CTHD.current?.TongTien
                    : CTHD.current?.GiaoDich[CTHD.current?.GiaoDich.length - 1]
                        ?.DaThanhToan}
                </Typography>
                <Typography>
                  <b>Chưa thanh toán:</b>{" "}
                  {CTHD.current?.TrangThai === "Đã thanh toán"
                    ? 0
                    : parseFloat(CTHD.current?.TongTien) -
                      parseFloat(
                        CTHD.current?.GiaoDich[
                          CTHD.current?.GiaoDich.length - 1
                        ]?.DaThanhToan
                      )}
                </Typography>{" "}
              </>
            ) : (
              <Typography sx={{ paddingY: 2 }}>
                Khách hàng không đặt phòng trực tuyến nên không có thông tin
                giao dịch
              </Typography>
            )}
          </Box>

          <Typography
            sx={{
              mx: 2,
            }}
          >
            <b>Tổng tiền hoá đơn:</b> {CTHD.current?.TongTien}
          </Typography>

          {CTHD.current?.TrangThai === "Đã đặt cọc" && (
            <Button
              sx={{
                px: 2,
                py: 2,
                m: 3,
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              Xác nhận đã thanh toán
            </Button>
          )}
        </Box>

        {openDialog && (
          <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Xác nhận thanh toán
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Bạn xác nhận hoá đơn ${CTHD.current?._id} đã thanh toán?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Không</Button>
              <Button
                onClick={() => {
                  handleSubmit(CTHD.current?._id);
                }}
                autoFocus
              >
                Có
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Card>
    </Container>
  );
};

export default ChiTiet;
