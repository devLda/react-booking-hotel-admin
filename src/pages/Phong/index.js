import { filter } from "lodash";
import { useEffect, useState } from "react";
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
} from "@mui/material";

// components
// import Label from '../components/label';
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
import { getAllPhong } from "../../store/phong/asyncAction";
import { LoadingData } from "../../components/UI/loading";
import path from "../../utils/path";
import Swal from "sweetalert2";
import { apiDeletePhong } from "../../api";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "TenLoaiPhong", label: "Tên Loại Phòng", alignRight: false },
  { id: "MaPhong", label: "Số Phòng", alignRight: false },
  { id: "Tang", label: "Tầng", alignRight: false },
  { id: "SoNguoi", label: "Số người tối đa", alignRight: false },
  { id: "DienTich", label: "Diện tích", alignRight: false },
  { id: "GiaPhong", label: "Giá phòng", alignRight: false },
  { id: "Image", label: "Hình ảnh", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (orderBy === "TenLoaiPhong") {
    if (b.LoaiPhong[orderBy] < a.LoaiPhong[orderBy]) {
      return 1;
    }
    if (b.LoaiPhong[orderBy] > a.LoaiPhong[orderBy]) {
      return -1;
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
      (LP) =>
        LP.LoaiPhong.TenLoaiPhong.toLowerCase().indexOf(query.toLowerCase()) !==
        -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Phong = () => {
  const { isLoading } = useSelector((state) => state.phong);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("TenLoaiPhong");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listPhong, setListPhong] = useState([]);

  const [phongSelected, setPhongSelected] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [deleted, setDeleted] = useState(false);

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

  const handleDelete = async (event, selectedAcc) => {
    if (event) {
      const response = await apiDeletePhong(selectedAcc);
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

  useEffect(() => {
    dispatch(getAllPhong())
      .then((res) => {
        console.log("res ", res);
        if (res.meta.requestStatus === "fulfilled") {
          setListPhong(res.payload);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }, [dispatch, deleted]);

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
            Phòng
          </Typography>
          <Link to={`/${path.PHONG_CREATE}`}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              className="bg-green-600"
            >
              Thêm Phòng
            </Button>
          </Link>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setValue={false}
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
                        MaPhong,
                        LoaiPhong,
                        Tang,
                        SoNguoi,
                        DienTich,
                        GiaPhong,
                        images,
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
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell> */}

                          <TableCell align="left">
                            {LoaiPhong.TenLoaiPhong}
                          </TableCell>

                          <TableCell align="left">{MaPhong}</TableCell>

                          <TableCell align="left">{Tang}</TableCell>

                          <TableCell align="left">{SoNguoi}</TableCell>

                          <TableCell align="left">{DienTich}</TableCell>

                          <TableCell align="left">{GiaPhong}</TableCell>

                          <TableCell align="left">
                            {images.length > 0 && (
                              <img
                                src={images[0]}
                                className="w-20 h-20"
                                alt={LoaiPhong.TenLoaiPhong}
                              />
                            )}
                          </TableCell>

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

          {filteredPhong.length > 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredPhong.length}
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
          to={`/${path.PHONG_UPDATE}/${phongSelected}`}
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
          Xoá
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
              {`Bạn có muốn xóa loại phòng có tên ${phongSelected} không?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button onClick={(e) => handleDelete(e, phongSelected)} autoFocus>
              Có
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Phong;
