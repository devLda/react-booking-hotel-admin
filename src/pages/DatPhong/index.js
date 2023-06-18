import { filter } from "lodash";
import { useEffect, useRef, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
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
import Iconify from "../../components/UI/iconify";
import Scrollbar from "../../components/UI/scrollbar";
// sections
import { ListHead, ListToolbar } from "../../components/UI/table";

import { Link } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch, useSelector } from "react-redux";
import { getAllDP } from "../../store/datphong/asyncAction";
import { LoadingData } from "../../components/UI/loading";
import path from "../../utils/path";
import Swal from "sweetalert2";
import { apiAllPhong, apiCancelDP } from "../../api";
import { Select } from "../../components/UI/form";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import moment from "moment";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "TenKH", label: "Tên khách hàng", alignRight: false },
  { id: "Email", label: "Email", alignRight: false },
  { id: "SDT", label: "Số điện thoại", alignRight: false },
  { id: "MaPhong", label: "Số phòng", alignRight: false },
  { id: "NgayBatDau", label: "Ngày nhận phòng", alignRight: false },
  { id: "NgayKetThuc", label: "Ngày trả phòng", alignRight: false },
  { id: "Trạng thái", label: "Trạng thái", alignRight: false },
  { id: "" },
];

const optionTT = [
  {
    id: "DaThanhToan",
    title: "Đã thanh toán",
  },
  {
    id: "DaDat",
    title: "Đã đặt",
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

  if (orderBy === "MaPhong") {
    if (a.Phong[orderBy] > b.Phong[orderBy]) {
      return -1;
    }
    if (a.Phong[orderBy] < b.Phong[orderBy]) {
      return 1;
    }
    return 0;
  }

  if (orderBy === "NgayBatDau") {
    let arrA = a[orderBy].split("-");
    let arrB = b[orderBy].split("-");
    let ABatDau = arrA[2] + "" + arrA[1] + "" + arrA[0];
    let BBatDau = arrB[2] + "" + arrB[1] + "" + arrB[0];
    if (ABatDau > BBatDau) {
      return -1;
    }
    if (ABatDau < BBatDau) {
      return 1;
    }
    return 0;
  }

  if (orderBy === "NgayKetThuc") {
    let arrA = a[orderBy].split("-");
    let arrB = b[orderBy].split("-");
    let AKetThuc = arrA[2] + "" + arrA[1] + "" + arrA[0];
    let BKetThuc = arrB[2] + "" + arrB[1] + "" + arrB[0];
    if (AKetThuc > BKetThuc) {
      return -1;
    }
    if (AKetThuc < BKetThuc) {
      return 1;
    }
    return 0;
  }

  if (b[orderBy] > a[orderBy]) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
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
      (LP) =>
        LP.ThongTinKH.TenKH.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const DatPhong = () => {
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

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("TenLoaiPhong");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dondat, setDonDat] = useState([]);

  const [listDP, setListDP] = useState([]);

  const [listPhong, setListPhong] = useState([]);

  const [DPSelected, setDPSelected] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);

  const [selectedTT, setSelectedTT] = useState("");

  const [selectedPhong, setSelectedPhong] = useState("");

  const [deleted, setDeleted] = useState(false);

  const handleOpenMenu = (event, TenLoaiPhong) => {
    setDPSelected(TenLoaiPhong);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setDPSelected("");
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
      const newSelecteds = listDP.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listDP.length) : 0;

  const filteredDP = applySortFilter(
    listDP,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredDP.length && !!filterName;

  const handleAction = (e) => {
    console.log("event ", e.target.innerText);
    console.log("target", e.target.dataset.set);
    if (e.target.dataset.set) {
      if (e.target.innerText === "Huỷ") setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  const handleDelete = async (event, selectedDP) => {
    if (event) {
      const response = await apiCancelDP(selectedDP);
      if (response.success) {
        setOpenDialog(false);
        setDeleted(true);
        setOpen(false);
        console.log("res delete", response);
        Swal.fire("Thành công", response.mes, "success");
      } else {
        setOpenDialog(false);
        setDeleted(false);
        setOpen(false);
        Swal.fire("Thất bại", response.mes, "error");
      }
    }
  };

  const filterDate = (start, end, dondats) => {
    let tempDay = [];
    for (const item of dondats) {
      let current = false;

      if (
        moment(start, "DD-MM-YYYY").isBefore(
          moment(item?.NgayBatDau, "DD-MM-YYYY")
        ) &&
        moment(end, "DD-MM-YYYY").isAfter(
          moment(item?.NgayKetThuc, "DD-MM-YYYY")
        )
      ) {
        current = true;
      } else if (
        (start === item?.NgayBatDau &&
          moment(end, "DD-MM-YYYY").isAfter(
            moment(item?.NgayKetThuc, "DD-MM-YYYY")
          )) ||
        (moment(start, "DD-MM-YYYY").isBefore(
          moment(item?.NgayBatDau, "DD-MM-YYYY")
        ) &&
          end === item?.NgayKetThuc) ||
        (start === item?.NgayBatDau && end === item?.NgayKetThuc)
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

    let temp = hasDate ? filterDate(start, end, dondat) : dondat;

    if (selectedTT) {
      let filterTT = null;
      filterTT = temp.filter((item) => {
        let trangthai = "";
        if (item.TrangThai === "Đã đặt") {
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

    if (selectedPhong) {
      let filterPhong = null;
      if (temp.length > 0) {
        filterPhong = temp.filter((item) => item.Phong._id === selectedPhong);
      } else {
        filterPhong = [];
      }
      temp = [...filterPhong];
    }

    console.log("temp ", temp);
    setListDP(temp);
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    dispatch(getAllDP())
      .then((res) => {
        console.log("res ", res);
        if (res.meta.requestStatus === "fulfilled") {
          setListDP(res.payload);
          setDonDat(res.payload);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });

    apiAllPhong()
      .then((res) => {
        console.log("res ", res);
        if (res.success) {
          const list = res.data.map((item) => {
            return {
              id: item._id,
              title: item.MaPhong,
            };
          });
          setListPhong(list);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }, [dispatch, deleted]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateRef, dates]);

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
            Đơn Đặt Phòng
          </Typography>
          <Link to={`/${path.DATPHONG_CREATE}`}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              className="bg-green-600"
            >
              Thêm Đơn Đặt
            </Button>
          </Link>
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
                  rowCount={listDP.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  hasChk={false}
                />
                <TableBody>
                  {filteredDP
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        ThongTinKH,
                        Phong,
                        NgayBatDau,
                        NgayKetThuc,
                        TrangThai,
                      } = row;
                      const selectedUser = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell align="left">{ThongTinKH.TenKH}</TableCell>

                          <TableCell align="left">{ThongTinKH.Email}</TableCell>

                          <TableCell align="left">{ThongTinKH.SDT}</TableCell>

                          <TableCell align="left">{Phong.MaPhong}</TableCell>

                          <TableCell align="left">{NgayBatDau}</TableCell>

                          <TableCell align="left">{NgayKetThuc}</TableCell>

                          <TableCell align="left">{TrangThai}</TableCell>

                          <TableCell align="right">
                            {TrangThai === "Đã đặt" && (
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

          {filteredDP.length > 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              // count={USERLIST.length}
              count={filteredDP.length}
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
          to={`/${path.DATPHONG_UPDATE}/${DPSelected}`}
          className="no-underline"
        >
          <MenuItem>
            <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
        </Link>

        <MenuItem
          sx={{ color: "error.main" }}
          data-set={DPSelected}
          onClick={handleAction}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Huỷ
        </MenuItem>
      </Popover>

      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Xóa loại phòng</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Bạn có muốn huỷ đơn đặt có mã ${DPSelected} không?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button onClick={(e) => handleDelete(e, DPSelected)} autoFocus>
              Có
            </Button>
          </DialogActions>
        </Dialog>
      )}

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
          <div className="my-5">
            <Select
              label="Phòng"
              name="Phong"
              options={listPhong}
              value={selectedPhong ? selectedPhong : null}
              setChange={setSelectedPhong}
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

export default DatPhong;
