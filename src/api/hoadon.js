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

export const apiStaticTong = () =>
  axios({
    url: "/hoadon/statictong",
    method: "get",
  });

export const apiUpdateTTHD = (id) =>
  axios({
    url: `/hoadon/updatett/${id}`,
    method: "put",
  });
