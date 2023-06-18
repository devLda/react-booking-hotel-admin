import { filter } from "lodash";
import { useEffect, useState, useRef } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  Box,
} from "@mui/material";

// components
// import Label from '../components/label';
import Iconify from "../../components/UI/iconify";
import Scrollbar from "../../components/UI/scrollbar";
// sections
import { ListHead, ListToolbar } from "../../components/UI/table";

import { Select } from "../../components/UI/form";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHD } from "../../store/hoadon/asyncAction";
import { LoadingData } from "../../components/UI/loading";
import path from "../../utils/path";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import moment from "moment";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "_id", label: "Mã hoá đơn", alignRight: false },
  { id: "TenKH", label: "Tên khách hàng", alignRight: false },
  { id: "Email", label: "Email", alignRight: false },
  { id: "SDT", label: "Số điện thoại", alignRight: false },
  { id: "DatPhong", label: "Mã đặt phòng", alignRight: false },
  { id: "TongTien", label: "Tổng tiền", alignRight: false },
  { id: "TrangThai", label: "Trạng thái", alignRight: false },
  { id: "" },
];

const optionTT = [
  {
    id: "DaThanhToan",
    title: "Đã thanh toán",
  },
  {
    id: "DaDat",
    title: "Đã đặt cọc",
  },
  {
    id: "DaHuy",
    title: "Đã hủy",
  },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (orderBy === "TenKH") {
    let arrA = a.ThongTinKH[orderBy].split(" ");
    let arrB = b.ThongTinKH[orderBy].split(" ");
    if (arrA[arrA.length - 1] > arrB[arrB.length - 1]) {
      return 1;
    }
    if (arrA[arrA.length - 1] < arrB[arrB.length - 1]) {
      return -1;
    }
    return 0;
  }

  if (orderBy === "Email") {
    if (a.ThongTinKH[orderBy] > b.ThongTinKH[orderBy]) {
      return 1;
    }
    if (a.ThongTinKH[orderBy] < b.ThongTinKH[orderBy]) {
      return -1;
    }
    return 0;
  }

  if (orderBy === "SDT") {
    if (a.ThongTinKH[orderBy] > b.ThongTinKH[orderBy]) {
      return -1;
    }
    if (a.ThongTinKH[orderBy] < b.ThongTinKH[orderBy]) {
      return 1;
    }
    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (HoaDonSort) =>
        HoaDonSort.ThongTinKH.TenKH.toLowerCase().indexOf(
          query.toLowerCase()
        ) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const HoaDon = () => {
  const { isLoading } = useSelector((state) => state.phong);

  const dispatch = useDispatch();

  const dateRef = useRef();

  const [openDate, setOpenDate] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(null);

  const [openFilter, setOpenFilter] = useState(false);

  const [selectedTT, setSelectedTT] = useState("");

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("TenKH");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [hoadon, setHoaDon] = useState([]);

  const [listHD, setListHD] = useState([]);

  const [phongSelected, setPhongSelected] = useState("");

  const handleOpenMenu = (event, TenLoaiPhong) => {
    setPhongSelected(TenLoaiPhong);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setPhongSelected("");
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelecteds = USERLIST.map((n) => n.name);
      const newSelecteds = listHD.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filterDate = (start, end, hoadons) => {
    let tempDay = [];
    for (const item of hoadons) {
      let current = false;

      if (
        moment(start, "DD-MM-YYYY").isBefore(
          moment(item?.DatPhong?.NgayBatDau, "DD-MM-YYYY")
        ) &&
        moment(end, "DD-MM-YYYY").isAfter(
          moment(item?.DatPhong?.NgayKetThuc, "DD-MM-YYYY")
        )
      ) {
        current = true;
      } else if (
        (start === item?.DatPhong?.NgayBatDau &&
          moment(end, "DD-MM-YYYY").isAfter(
            moment(item?.DatPhong?.NgayKetThuc, "DD-MM-YYYY")
          )) ||
        (moment(start, "DD-MM-YYYY").isBefore(
          moment(item?.DatPhong?.NgayBatDau, "DD-MM-YYYY")
        ) &&
          end === item?.DatPhong?.NgayKetThuc) ||
        (start === item?.DatPhong?.NgayBatDau &&
          end === item?.DatPhong?.NgayKetThuc)
      ) {
        current = true;
      } else {
        current = false;
      }

      if (current) {
        tempDay.push(item);
      }
    }
    console.log("temp ", tempDay);
    return tempDay;
  };

  const handleFilter = () => {
    const hasDate = document.getElementById("chkHasDate").checked;
    const start = moment(dates[0].startDate).format("DD-MM-YYYY");
    const end = moment(dates[0].endDate).format("DD-MM-YYYY");

    let temp = hasDate ? filterDate(start, end, hoadon) : hoadon;

    if (selectedTT) {
      let filterTT = null;
      filterTT = temp.filter((item) => {
        let trangthai = "";
        if (item.TrangThai === "Đã đặt cọc") {
          trangthai = "DaDat";
        }
        if (item.TrangThai === "Đã thanh toán") {
          trangthai = "DaThanhToan";
        }
        if (item.TrangThai === "Đã hủy") {
          trangthai = "DaHuy";
        }
        return trangthai === selectedTT;
      });
      temp = [...filterTT];
    }

    console.log("temp ", temp);
    setListHD(temp);
    setOpenFilter(!openFilter);
  };

  const emptyRows =
    // page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listHD.length) : 0;

  const filteredHD = applySortFilter(
    listHD,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredHD.length && !!filterName;

  const handleAction = (e) => {
    console.log("event ", e.target.innerText);
    console.log("target", e.target.dataset.set);
  };

  useEffect(() => {
    dispatch(getAllHD())
      .then((res) => {
        console.log("res ", res);
        if (res.meta.requestStatus === "fulfilled") {
          setHoaDon(res.payload);
          setListHD(res.payload);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }, [dispatch]);

  if (isLoading) {
    return <LoadingData />;
  }

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Hóa đơn
          </Typography>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setValue={setOpenFilter}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={USERLIST.length}
                  rowCount={listHD.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  hasChk={false}
                />
                <TableBody>
                  {filteredHD
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, ThongTinKH, DatPhong, TongTien, TrangThai } =
                        row;
                      const selectedUser = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell align="left">
                            <Link to={`/${path.CHITIETHD}/${_id}`}>
                              <p className="w-24 overflow-hidden" align="left">
                                {ThongTinKH?._id}
                              </p>
                            </Link>
                          </TableCell>

                          <TableCell align="left">
                            <Link to={`/${path.CHITIETHD}/${_id}`}>
                              {ThongTinKH?.TenKH}
                            </Link>
                          </TableCell>

                          <TableCell align="left">
                            {ThongTinKH?.Email}
                          </TableCell>

                          <TableCell align="left">{ThongTinKH?.SDT}</TableCell>

                          <TableCell>
                            <p className="w-24 overflow-hidden" align="left">
                              {DatPhong._id}
                            </p>
                          </TableCell>

                          <TableCell align="left">{TongTien}</TableCell>

                          <TableCell align="left">{TrangThai}</TableCell>

                          {/* <TableCell align="left">
                              <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                            </TableCell> */}

                          <TableCell align="right">
                            {TrangThai === "Đang sử dụng" && (
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={(e) => handleOpenMenu(e, _id)}
                              >
                                <Iconify icon={"eva:more-vertical-fill"} />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>

                          <Typography variant="body2">
                            Không có kết quả cho &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Kiểm tra từ khoá bạn nhập vào
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {filteredHD.length > 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredHD.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Link
          to={`/${path.LOAIPHONG_UPDATE}/${phongSelected}`}
          className="no-underline"
        >
          <MenuItem>
            <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
        </Link>

        <MenuItem
          sx={{ color: "error.main" }}
          data-set={phongSelected}
          onClick={handleAction}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Thêm dịch vụ
        </MenuItem>
      </Popover>

      <Modal
        open={openFilter}
        onClose={() => {
          setOpenFilter(!openFilter);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50vw",
            height: "50vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflowY: "scroll",
          }}
        >
          <Typography
            id="modal-modal-description"
            sx={{
              fontSize: 20,
              fontWeight: 700,
              textTransform: "uppercase",
              my: 2,
            }}
          >
            Lọc
          </Typography>

          <div ref={dateRef} className="flex items-center gap-3 relative my-5">
            <input type="checkbox" id="chkHasDate" />
            <i class="fa-solid fa-calendar-days text-slate-300"></i>
            <span
              onClick={() => setOpenDate(!openDate)}
              className="text-slate-300 cursor-pointer text-lg"
            >{`Từ ngày ${format(dates[0].startDate, "dd/MM/yyyy")} đến ${format(
              dates[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setDates([item.selection]);
                }}
                dateDisplayFormat="dd/MM/yyyy"
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="absolute -top-20 right-0 z-10 shadow-2xl"
              />
            )}
          </div>

          <div className="my-5">
            <Select
              label="Trạng thái"
              name="TrangThai"
              options={optionTT}
              value={selectedTT ? selectedTT : null}
              setChange={setSelectedTT}
            />
          </div>

          <div className="bg-yellow-800 my-5 text-white inline-block ">
            <button className="p-3" onClick={handleFilter}>
              Lọc
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default HoaDon;
