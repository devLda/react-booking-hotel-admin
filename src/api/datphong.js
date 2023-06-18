import axios from "../axios";

export const apiMultiDataDP = () =>
  axios({
    url: "/datphong/multidata",
    method: "get",
  });

export const apiAllDP = () =>
  axios({
    url: "/datphong",
    method: "get",
  });

export const apiAddDP = (data) =>
  axios({
    url: "/datphong/add",
    method: "post",
    data,
  });

export const apiCreateDP = (data) =>
  axios({
    url: "/datphong/create",
    method: "post",
    data,
  });

export const apiGetDP = (id) =>
  axios({
    url: `/datphong/get/${id}`,
    method: "get",
  });

export const apiUpdateDP = (id, data) =>
  axios({
    url: `/datphong/update/${id}`,
    method: "put",
    data,
  });

export const apiCancelDP = (id) =>
  axios({
    url: `/datphong/cancel/${id}`,
    method: "get",
  });

export const apiCountDP = () =>
  axios({
    url: `/datphong/static`,
    method: "get",
  });
