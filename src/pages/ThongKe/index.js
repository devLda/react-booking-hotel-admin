import { useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { apiStaticDV, apiStaticPhong } from "../../api";

import { AppCurrentVisits } from "../../components/UI/dashboard";

const optionItems = [
  { id: "TongThuNhap", title: "Tổng thu nhập tháng" },
  { id: "Top5Phong", title: "Top 5 phòng được đặt nhiều nhất tháng" },
  { id: "Top5DichVu", title: "Top 5 dịch vụ được đặt nhiều nhất tháng" },
];

const ThongKe = () => {
  const theme = useTheme();

  const [listTK, setListTK] = useState([]);

  const [thongKe, setThongKe] = useState("");

  const [phong, setPhong] = useState([]);

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setThongKe(event.target.value);
  };

  useEffect(() => {
    if (thongKe === "Top5Phong") {
      apiStaticPhong()
        .then((res) => {
          console.log("res ", res);
        })
        .catch((err) => {
          console.log("err ", err);
        });
      setOpen(true);
    }

    if (thongKe === "Top5DichVu") {
      apiStaticDV()
        .then((res) => {
          console.log("res ", res);
        })
        .catch((err) => {
          console.log("err ", err);
        });
      setOpen(true);
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

        {open && (
          <Box
            sx={{
              mt: 4,
            }}
          >
            <AppCurrentVisits
              title="Current Visits"
              chartData={listTK}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default ThongKe;
