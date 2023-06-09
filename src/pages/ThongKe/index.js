import { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { apiStaticDV, apiStaticPhong, apiStaticTong } from "../../api";

import {
  AppCurrentVisits,
  AppConversionRates,
} from "../../components/UI/dashboard";

const optionItems = [
  { id: "Top5Phong", title: "Top 5 phòng được đặt nhiều nhất tháng" },
  { id: "TongThuNhap", title: "Tổng thu nhập 3 tháng gần nhất" },
  { id: "Top5DichVu", title: "Top 5 dịch vụ được đặt nhiều nhất tháng" },
];

const ThongKe = () => {
  const theme = useTheme();

  const [listTK, setListTK] = useState([]);

  const [thongKe, setThongKe] = useState("");

  const [title, setTitle] = useState("");

  const [tong, setTong] = useState(0);

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setThongKe(event.target.value);
  };

  useEffect(() => {
    if (thongKe === "Top5Phong") {
      apiStaticPhong()
        .then((res) => {
          console.log("res ", res);
          const data = res.sort((a, b) => {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
          });
          const data1 = data.slice(0, 5);
          const data2 = data.slice(5);

          const tongTK = data.reduce((value, cur) => {
            value += cur.value;
            return value;
          }, 0);
          const valueKhac = data2.reduce((value, cur) => {
            value += cur.value;
            return value;
          }, 0);
          data1.push({
            label: "Khác",
            value: valueKhac,
          });

          setTitle("Top 5 phòng được đặt nhiều nhất tháng");
          setTong(tongTK);
          setListTK(data1);
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
          const data = res.sort((a, b) => {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
          });
          const data1 = data.slice(0, 5);
          const data2 = data.slice(5);

          const tongTK = data.reduce((value, cur) => {
            value += cur.value;
            return value;
          }, 0);
          const valueKhac = data2.reduce((value, cur) => {
            value += cur.value;
            return value;
          }, 0);
          data1.push({
            label: "Khác",
            value: valueKhac,
          });

          setTitle("Top 5 dịch vụ được đặt nhiều nhất tháng");
          setTong(tongTK);
          setListTK(data1);
        })
        .catch((err) => {
          console.log("err ", err);
        });
      setOpen(true);
    }

    if (thongKe === "TongThuNhap") {
      apiStaticTong()
        .then((res) => {
          console.log("res ", res);
          setTitle("Thu nhập 3 tháng gần nhất");
          setOpen(true);
          setListTK(res);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }

    if (thongKe === "") {
      setOpen(false);
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

        {open && title !== "Thu nhập 3 tháng gần nhất" && (
          <Box
            sx={{
              mt: 4,
            }}
          >
            <AppCurrentVisits
              title={title}
              total={tong}
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
        {open && title === "Thu nhập 3 tháng gần nhất" && (
          <Box
            sx={{
              mt: 4,
            }}
          >
            <AppConversionRates title={title} chartData={listTK} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default ThongKe;
