import axios from "../axios";

export const apiMultiDataHD = () =>
  axios({
    url: "/hoadon/multidata",
    method: "get",
  });

export const apiStaticDV = () =>
  axios({
    url: "/hoadon/staticdv",
    method: "get",
  });
