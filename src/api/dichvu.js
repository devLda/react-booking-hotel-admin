import axios from "../axios";

export const apiAllDV = () =>
  axios({
    url: "/dichvu/all",
    method: "get",
  });

export const apiAddDV = (data) =>
  axios({
    url: "/dichvu/add",
    method: "post",
    data,
  });

export const apiGetDV = (MaDichVu) =>
  axios({
    url: `/dichvu/get/${MaDichVu}`,
    method: "get",
  });

export const apiUpdateDV = (MaDichVu, data) =>
  axios({
    url: `/dichvu/update/${MaDichVu}`,
    method: "put",
    data,
  });

export const apiDeleteDV = (MaDichVu) =>
  axios({
    url: `/dichvu/delete/${MaDichVu}`,
    method: "delete",
  });
