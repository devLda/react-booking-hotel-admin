import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { Page404 } from "../pages/Page404";
import Layout from "../components/Layout/Layout";
import Reservation from "../pages/Reservation";
import Account from "../pages/Account";
import LoaiPhong from "../pages/LoaiPhong";
import Phong from "../pages/Phong";
import CreateAccount from "../pages/Account/create";
import CreateLP from "../pages/LoaiPhong/create";
import CreateDP from "../pages/DatPhong/create";
import CreateHD from "../pages/HoaDon/create";
import CreateDV from "../pages/DichVu/create";
import CreatePhong from "../pages/Phong/create";
import PrivateRoute from "./PrivateRoute";
import DatPhong from "../pages/DatPhong";
import HoaDon from "../pages/HoaDon";
import ThongKe from "../pages/ThongKe";
import DichVu from "../pages/DichVu";
import ChiTiet from "../pages/HoaDon/chitiet";

const Routers = () => {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        {
          path: "app",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "reservation",
          element: (
            <PrivateRoute>
              <Reservation />
            </PrivateRoute>
          ),
        },
        {
          path: "account",
          element: (
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          ),
        },
        {
          path: "account/create",
          element: (
            <PrivateRoute>
              <CreateAccount />
            </PrivateRoute>
          ),
        },
        {
          path: "account/update/:Email",
          element: (
            <PrivateRoute>
              <CreateAccount type="Edit" />
            </PrivateRoute>
          ),
        },
        {
          path: "loaiphong",
          element: (
            <PrivateRoute>
              <LoaiPhong />
            </PrivateRoute>
          ),
        },
        {
          path: "loaiphong/create",
          element: (
            <PrivateRoute>
              <CreateLP />
            </PrivateRoute>
          ),
        },
        {
          path: "loaiphong/update/:TenLoaiPhong",
          element: (
            <PrivateRoute>
              <CreateLP type="Edit" />
            </PrivateRoute>
          ),
        },
        {
          path: "phong",
          element: (
            <PrivateRoute>
              <Phong />
            </PrivateRoute>
          ),
        },
        {
          path: "phong/create",
          element: (
            <PrivateRoute>
              <CreatePhong />
            </PrivateRoute>
          ),
        },
        {
          path: "phong/update/:_id",
          element: (
            <PrivateRoute>
              <CreatePhong type="Edit" />
            </PrivateRoute>
          ),
        },
        {
          path: "datphong",
          element: (
            <PrivateRoute>
              <DatPhong />
            </PrivateRoute>
          ),
        },
        {
          path: "datphong/create",
          element: (
            <PrivateRoute>
              <CreateDP />
            </PrivateRoute>
          ),
        },
        {
          path: "datphong/update/:id",
          element: (
            <PrivateRoute>
              <CreateDP type="Edit" />
            </PrivateRoute>
          ),
        },
        {
          path: "hoadon",
          element: (
            <PrivateRoute>
              <HoaDon />
            </PrivateRoute>
          ),
        },
        {
          path: "chitiethd/:id",
          element: (
            <PrivateRoute>
              <ChiTiet />
            </PrivateRoute>
          ),
        },
        {
          path: "hoadon/create",
          element: (
            <PrivateRoute>
              <CreateHD />
            </PrivateRoute>
          ),
        },
        {
          path: "hoadon/update/:_id",
          element: (
            <PrivateRoute>
              <CreateHD type="Edit" />
            </PrivateRoute>
          ),
        },
        {
          path: "thongke",
          element: (
            <PrivateRoute>
              <ThongKe />
            </PrivateRoute>
          ),
        },
        {
          path: "dichvu",
          element: (
            <PrivateRoute>
              <DichVu />
            </PrivateRoute>
          ),
        },
        {
          path: "dichvu/create",
          element: (
            <PrivateRoute>
              <CreateDV />
            </PrivateRoute>
          ),
        },
        {
          path: "dichvu/update/:MaDichVu",
          element: (
            <PrivateRoute>
              <CreateDV type="Edit" />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      element: <Layout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
      ],
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return routes;
};

export default Routers;
