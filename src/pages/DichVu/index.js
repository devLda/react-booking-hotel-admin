/* eslint-disable  react-hooks/exhaustive-deps */
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
import { getAllDV } from "../../store/dichvu/asyncAction";
import { apiDeleteDV } from "../../api";
import Swal from "sweetalert2";
import { LoadingData } from "../../components/UI/loading";
import path from "../../utils/path";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "MaDichVu", label: "Mã dịch vụ", alignRight: false },
  { id: "TenDichVu", label: "Tên dịch vụ", alignRight: false },
  { id: "GiaDichVu", label: "Giá dịch vụ", alignRight: false },
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
      (_dichvu) =>
        _dichvu.TenDichVu.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const DichVu = () => {
  const dichvu = useSelector((state) => state.dichvu);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("TenDichVu");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listDV, setListDV] = useState(dichvu.data ? dichvu.data : []);

  const [DVSelect, setDVSelected] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const handleOpenMenu = (event, MaDichVu) => {
    setDVSelected(MaDichVu);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setDVSelected("");
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
      const newSelecteds = listDV.map((n) => n.MaDichVu);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listDV.length) : 0;

  const filteredDV = applySortFilter(
    // USERLIST,
    listDV,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredDV.length && !!filterName;

  const handleAction = (e) => {
    console.log("event ", e.target.innerText);
    if (e.target.innerText === "Xóa") {
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  const handleDelete = async (event, selectedDV) => {
    if (event) {
      const response = await apiDeleteDV(selectedDV);
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
    dispatch(getAllDV())
      .then((res) => {
        console.log("res ", res);
        if (res.payload.mes === "AccessToken không hợp lệ") {
          Swal.fire(
            "Thông báo",
            "Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại",
            "info"
          ).then(() => {
            window.location.href = "/login";
          });
        } else {
          setListDV(res.payload);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }, [dispatch, deleted]);

  if (dichvu.isLoading === true) {
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
            Dịch vụ
          </Typography>
          <Link to="/dashboard/dichvu/create">
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              className="bg-green-600"
            >
              Thêm Dịch vụ
            </Button>
          </Link>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={USERLIST.length}
                  rowCount={listDV.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredDV
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        MaDichVu,
                        TenDichVu,
                        GiaDichVu,
                        // HoVaTen, Email, SDT, Role, createdAt
                      } = row;
                      const selectedDV = selected.indexOf(MaDichVu) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedDV}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedDV}
                              onChange={(event) => handleClick(event, MaDichVu)}
                            />
                          </TableCell> */}

                          <TableCell align="left">{MaDichVu}</TableCell>

                          <TableCell align="left">{TenDichVu}</TableCell>

                          <TableCell align="left">{GiaDichVu}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => handleOpenMenu(e, MaDichVu)}
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
                            <br /> Thử kiểm tra lại từ khóa tìm kiếm, nhập tên
                            dịch vụ cần tìm
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {filteredDV.length > 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredDV.length}
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
          to={`/${path.DICHVU_UPDATE}/${DVSelect}`}
          className="no-underline"
        >
          <MenuItem>
            <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
        </Link>

        <MenuItem
          sx={{ color: "error.main" }}
          data-set={DVSelect}
          onClick={handleAction}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Xóa tài khoản</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Bạn có muốn xóa tài khoản ${DVSelect} không?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button onClick={(e) => handleDelete(e, DVSelect)} autoFocus>
              Có
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DichVu;
