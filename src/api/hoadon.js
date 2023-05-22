import axios from "../axios";

export const apiMultiDataHD = () =>
  axios({
    url: "/hoadon/multidata",
    method: "get",
  });
