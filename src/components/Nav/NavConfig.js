// component
import SvgColor from "../UI/svg-color";

// ----------------------------------------------------------------------
import ic_analytics from "../../assets/icons/navbar/ic_analytics.svg";
import ic_user from "../../assets/icons/navbar/ic_user.svg";
import ic_blog from "../../assets/icons/navbar/ic_blog.svg";
import ic_lock from "../../assets/icons/navbar/ic_lock.svg";
import ic_cart from "../../assets/icons/navbar/ic_cart.svg";
import ic_disabled from "../../assets/icons/navbar/ic_disabled.svg";

const icon = (name) => <SvgColor src={name} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard/app",
    icon: icon(ic_disabled),
  },
  {
    title: "Đơn đặt",
    path: "/dashboard/datphong",
    icon: icon(ic_cart),
  },
  {
    title: "Hoá đơn",
    path: "/dashboard/hoadon",
    icon: icon(ic_blog),
  },
  {
    title: "Phòng",
    path: "/dashboard/phong",
    icon: icon(ic_analytics),
  },
  {
    title: "Loại phòng",
    path: "/dashboard/loaiphong",
    icon: icon(ic_lock),
  },
  {
    title: "Tài khoản",
    path: "/dashboard/account",
    icon: icon(ic_user),
  },
];

export default navConfig;
