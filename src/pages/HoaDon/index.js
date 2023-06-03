import { filter } from "lodash";
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  // Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";

// components
// import Label from '../components/label';
import Iconify from "../../components/UI/iconify";
import Scrollbar from "../../components/UI/scrollbar";
// sections
import { ListHead, ListToolbar } from "../../components/UI/table";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHD } from "../../store/hoadon/asyncAction";
import { LoadingData } from "../../components/UI/loading";
import path from "../../utils/path";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "TenKH", label: "Tên khách hàng", alignRight: false },
  { id: "Email", label: "Email", alignRight: false },
  { id: "SDT", label: "Số điện thoại", alignRight: false },
  { id: "DatPhong", label: "Mã đặt phòng", alignRight: false },
  { id: "DaThanhToan", label: "Đã thanh toán", alignRight: false },
  { id: "MaGD", label: "Mã Giao Dịch", alignRight: false },
  { id: "NgayThanhToan", label: "Thời gian thanh toán", alignRight: false },
  { id: "TongTien", label: "Tổng tiền", alignRight: false },
  { id: "TrangThai", label: "Trạng thái", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
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
      (LP) =>
        LP.ThongTinKH.TenKH.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const HoaDon = () => {
  const { isLoading } = useSelector((state) => state.phong);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("TenKhachHang");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listPhong, setListPhong] = useState([]);

  const [phongSelected, setPhongSelected] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

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
      const newSelecteds = listPhong.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const emptyRows =
    // page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listPhong.length) : 0;

  const filteredPhong = applySortFilter(
    // USERLIST,
    listPhong,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredPhong.length && !!filterName;

  const handleAction = (e) => {
    console.log("event ", e.target.innerText);
    console.log("target", e.target.dataset.set);
    if (e.target.dataset.set) {
      if (e.target.innerText === "Xoá") setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllHD())
      .then((res) => {
        console.log("res ", res);
        if (res.meta.requestStatus === "fulfilled") {
          setListPhong(res.payload);
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
            Đơn Đặt Phòng
          </Typography>
          {/* <Link to={`/${path.PHONG_CREATE}`}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              className="bg-green-600"
            >
              Thêm Đơn Đặt
            </Button>
          </Link> */}
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setValue={setOpenDialog}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={USERLIST.length}
                  rowCount={listPhong.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredPhong
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        ThongTinKH,
                        DatPhong,
                        GiaoDich,
                        TongTien,
                        TrangThai,

                        // _id,
                        // ThongTinKH,
                        // Phong,
                        // NgayBatDau,
                        // NgayKetThuc,
                        // TrangThai,

                        // LoaiPhong,
                        // Tang,
                        // SoNguoi,
                        // DienTich,
                        // GiaPhong,
                        // images,
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
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell>

                          <TableCell align="left">
                            {ThongTinKH?.TenKH}
                          </TableCell>

                          <TableCell align="left">
                            {ThongTinKH?.Email}
                          </TableCell>

                          <TableCell align="left">{ThongTinKH?.SDT}</TableCell>

                          <TableCell>
                            <p
                              className="w-24 overflow-hidden"
                              align="left"
                            >
                              {DatPhong._id}
                            </p>
                          </TableCell>

                          <TableCell align="left">
                            {GiaoDich[GiaoDich?.length - 1].DaThanhToan}
                          </TableCell>

                          <TableCell >
                            <p
                              className="w-24 overflow-hidden"
                              align="left"
                            >
                            {GiaoDich[GiaoDich?.length - 1].MaGD}
                            </p>
                          </TableCell>

                          <TableCell align="left">
                            {GiaoDich[GiaoDich?.length - 1].NgayThanhToan}
                          </TableCell>

                          <TableCell align="left">{TongTien}</TableCell>

                          <TableCell align="left">{TrangThai}</TableCell>

                          {/* <TableCell align="left">
                              <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                            </TableCell> */}

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => handleOpenMenu(e, _id)}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
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
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            // count={USERLIST.length}
            count={listPhong.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
    </>
  );
};

export default HoaDon;
