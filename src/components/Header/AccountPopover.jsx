import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
// account
import avata from "../../assets/images/avatars/avatar_default.jpg";
import { useDispatch, useSelector } from "react-redux";
import { apiLogout } from "../../api/user";
import { logout } from "../../store/user/userSlice";
import Swal from "sweetalert2";
import path from "../../utils/path";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
  },
];

// ----------------------------------------------------------------------

const AccountPopover = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { current } = useSelector((state) => state.user);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    const response = await apiLogout();
    if (response.success) {
      Swal.fire("Thành công", "Đăng xuất thành công", "success").then(() => {
        dispatch(
          logout({
            isLoggedIn: false,
            token: null,
            userData: null,
          })
        );
        navigate(`/${path.LOGIN}`);
      });
    } else Swal.fire("Thất bại", "Đã xảy ra lỗi!", "error");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.8),
            },
          }),
        }}
      >
        <Avatar src={avata} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {current?.HoVaTen}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {current?.Email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
