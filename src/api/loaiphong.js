import axios from "../axios";

export const apiAllLP = () =>
  axios({
    url: "/loaiphong/all",
    method: "get",
  });

export const apiAddLP = (data) =>
  axios({
    url: "/loaiphong/add",
    method: "post",
    data,
  });

export const apiGetLP = (TenLoaiPhong) =>
  axios({
    url: `/loaiphong/get/${TenLoaiPhong}`,
    method: "get",
  });

export const apiUpdateLP = (TenLoaiPhong, data) =>
  axios({
    url: `/loaiphong/update/${TenLoaiPhong}`,
    method: "put",
    data,
  });

export const apiDeleteLP = (TenLoaiPhong) =>
  axios({
    url: `/loaiphong/delete/${TenLoaiPhong}`,
    method: "delete",
  });

export const apiUploadImg = (data) =>
  axios({
    url: `/loaiphong/uploadimage`,
    method: "put",
    data,
  });
