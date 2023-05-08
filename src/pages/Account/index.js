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
import AlertDialog from "../../components/UI/dialog";
// sections
import { ListHead, ListToolbar } from "../../components/UI/table";
// mock
// import USERLIST from "../../api/listAccount";
import api from "./config";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "HoVaTen", label: "Name", alignRight: false },
  { id: "Username", label: "Username", alignRight: false },
  { id: "SDT", label: "Phone", alignRight: false },
  { id: "Email", label: "Email", alignRight: false },
  { id: "GioiTinh", label: "Gender", alignRight: false },
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
      (_user) => _user.HoVaTen.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Account = () => {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("HoVaTen");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listAcc, setListAcc] = useState([]);

  const [userSelected, setUserSelected] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenMenu = (event, Username) => {
    setUserSelected(Username);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listAcc.length) : 0;

  const filteredUsers = applySortFilter(
    // USERLIST,
    listAcc,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleDelete = (e) => {
    console.log("event ", e.target.dataset.set);
    setOpenDialog(true);
  };

  useEffect(() => {
    api
      .listAccount()
      .then((res) => {
        if (res.status > 0) {
          setListAcc(res.data);
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

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
            Account
          </Typography>
          <Link to="/dashboard/account/create">
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Account
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
                      const { id, Username, HoVaTen, SDT, Email, GioiTinh } =
                        row;
                      const selectedUser = selected.indexOf(HoVaTen) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, HoVaTen)}
                            />
                          </TableCell>

                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={photoURL} />
                              <Typography variant="subtitle2" noWrap>
                                {HoVaTen}
                              </Typography>
                            </Stack>
                          </TableCell> */}

                          <TableCell align="left">{HoVaTen}</TableCell>

                          <TableCell align="left">{Username}</TableCell>

                          <TableCell align="left">{SDT}</TableCell>

                          <TableCell align="left">{Email}</TableCell>

                          <TableCell align="left">
                            {GioiTinh ? "Nam" : "Nữ"}
                          </TableCell>

                          {/* <TableCell align="left">
                              <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                            </TableCell> */}

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => handleOpenMenu(e, Username)}
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
            count={listAcc.length}
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
        <MenuItem data-set={userSelected} onClick={handleDelete}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          data-set={userSelected}
          onClick={handleDelete}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <AlertDialog
        alert="Bạn có muốn xoá người dùng không?"
        openIni={openDialog}
      />
    </>
  );
};

export default Account;
