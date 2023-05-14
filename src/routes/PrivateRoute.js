import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  console.log(children);

  if (!isLoggedIn)
    Swal.fire(
      "Bạn chưa đăng nhập",
      "Vui lòng đăng nhập bằng tài khoản admin",
      "info"
    );

  // Add your own authentication on the below line.

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
