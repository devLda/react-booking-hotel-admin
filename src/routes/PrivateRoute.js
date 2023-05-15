import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const isLogged = JSON.parse(localStorage.getItem("persist:admin/login"));

  if (isLogged.isLoggedIn === "false")
    Swal.fire(
      "Bạn chưa đăng nhập",
      "Vui lòng đăng nhập bằng tài khoản admin",
      "info"
    );

  // Add your own authentication on the below line.

  return isLogged.isLoggedIn === "true" ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
