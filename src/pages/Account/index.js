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
import { getAllUser } from "../../store/user/asyncAction";
import { apiDeleteUser } from "../../api/user";
import Swal from "sweetalert2";
import { LoadingData } from "../../components/UI/loading";
import path from "../../utils/path";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "HoVaTen", label: "Họ và tên", alignRight: false },
  { id: "Email", label: "Email", alignRight: false },
  { id: "SDT", label: "Số điện thoại", alignRight: false },
  { id: "Role", label: "Quyền", alignRight: false },
  { id: "NgayTao", label: "Ngày tạo", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (orderBy === "HoVaTen") {
    let arrA = a[orderBy].split(" ");
    let arrB = b[orderBy].split(" ");
    if (arrA[arrA.length - 1] > arrB[arrB.length - 1]) {
      return 1;
    }
    if (arrA[arrA.length - 1] < arrB[arrB.length - 1]) {
      return -1;
    }
    return 0;
  }

  if (orderBy === "Email") {
    if (b[orderBy] < a[orderBy]) {
      return 11;
    }
    if (b[orderBy] > a[orderBy]) {
      return -1;
    }
    return 0;
  }

  if (orderBy === "NgayTao") {
    let arrA = a["createdAt"].split("T");
    let arrB = b["createdAt"].split("T");
    let ABatDau = arrA[0];
    let BBatDau = arrB[0];
    if (ABatDau > BBatDau) {
      return -1;
    }
    if (ABatDau < BBatDau) {
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
      (_user) => _user.HoVaTen.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Account = () => {
  const { allUser, statusUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("HoVaTen");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listAcc, setListAcc] = useState(allUser ? allUser : []);

  const [userSelected, setUserSelected] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const handleOpenMenu = (event, Email) => {
    setUserSelected(Email);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setUserSelected("");
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
      const newSelecteds = listAcc.map((n) => n.HoVaTen);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listAcc.length) : 0;

  const filteredUsers = applySortFilter(
    // USERLIST,
    listAcc,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleAction = (e) => {
    console.log("event ", e.target.innerText);
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
      const response = await apiDeleteUser(selectedAcc);
      if (response.success) {
        setOpenDialog(false);
        setDeleted(true);
        setOpen(false);
        console.log("res delete", response);
        Swal.fire("Thành công", "Xóa tài khoản thành công", "success");
      } else {
        setOpenDialog(false);
        setDeleted(false);
        setOpen(false);
        Swal.fire("Thất bại", response.mes, "error");
      }
    }
  };

  useEffect(() => {
    dispatch(getAllUser())
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
          setListAcc(res.payload);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }, [dispatch, deleted]);

  if (statusUser === "pending") {
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
            Tài khoản
          </Typography>
          <Link to="/dashboard/account/create">
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              className="bg-green-600"
            >
              Thêm Tài khoản
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
                  rowCount={listAcc.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, HoVaTen, Email, SDT, Role, createdAt } = row;
                      const selectedUser = selected.indexOf(HoVaTen) !== -1;
                      const arrayCreate = createdAt.slice(0, 10).split("-");
                      const NgayTao =
                        arrayCreate[2] +
                        "/" +
                        arrayCreate[1] +
                        "/" +
                        arrayCreate[0];

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
                              onChange={(event) => handleClick(event, HoVaTen)}
                            />
                          </TableCell> */}

                          <TableCell align="left">{HoVaTen}</TableCell>

                          <TableCell align="left">{Email}</TableCell>

                          <TableCell align="left">{SDT}</TableCell>

                          <TableCell align="left">{Role}</TableCell>

                          <TableCell align="left">{NgayTao}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => handleOpenMenu(e, Email)}
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

          {filteredUsers.length > 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              // count={USERLIST.length}
              count={filteredUsers.length}
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
          to={`/${path.ACCOUNT_UPDATE}/${userSelected}`}
          className="no-underline"
        >
          <MenuItem>
            <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
        </Link>

        <MenuItem
          sx={{ color: "error.main" }}
          data-set={userSelected}
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
          <DialogTitle id="alert-dialog-title">Xóa tài khoản</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Bạn có muốn xóa tài khoản ${userSelected} không?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button onClick={(e) => handleDelete(e, userSelected)} autoFocus>
              Có
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Account;
