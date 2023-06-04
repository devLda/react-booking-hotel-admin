import { useEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { apiAllPhong } from "../../api";

const optionItems = [
  { id: "TongThuNhap", title: "Tổng thu nhập tháng" },
  { id: "Top5Phong", title: "Top 5 phòng được đặt nhiều nhất tháng" },
  { id: "Top5DichVu", title: "Top 5 dịch vụ được đặt nhiều nhất tháng" },
];

const ThongKe = () => {
  const [thongKe, setThongKe] = useState("");

  const [phong, setPhong] = useState([]);

  const handleChange = (event) => {
    setThongKe(event.target.value);
  };

  const allPhong = async () => {
    const response = await apiAllPhong();
    if (response.success) {
      setPhong(response.data);
    }
  };

  const filterPhong = (phongs) => {
    const tempRoom = [];

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const year = today.getFullYear() + "";
    const month =
      today.getMonth() < 10
        ? "0" + (today.getMonth() + 1)
        : "" + (today.getMonth() + 1);
    const fday =
      firstDay.getDate() < 10
        ? "0" + firstDay.getDate()
        : "" + firstDay.getDate();
    const lday =
      lastDay.getDate() < 10 ? "0" + lastDay.getDate() : "" + lastDay.getDate();
    const start = `${fday}-${month}-${year}`;
    const end = `${lday}-${month}-${year}`;

    for (const item of phongs) {
      let count = 0;
      if (item.LichDat.length > 0) {
        for (const booking of item.LichDat) {
          if (
            moment(booking.NgayBatDau, "DD-MM-YYYY").isBetween(
              moment(start, "DD-MM-YYYY"),
              moment(end, "DD-MM-YYYY")
            )
          ) {
            count++;
          }
        }
      }

      if (count > 0) {
        tempRoom.push({
          count: count,
          MaPhong: item.MaPhong,
        });
      }
    }

    console.log("temp ", tempRoom);
  };

  useEffect(() => {
    if (thongKe === "Top5Phong") {
      allPhong();
      filterPhong(phong);
    }
  }, [thongKe]);

  return (
    <>
      <Container>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Thống kê</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={thongKe}
              label="Thống kê"
              onChange={handleChange}
            >
              {optionItems.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default ThongKe;
