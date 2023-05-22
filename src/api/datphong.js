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

export const apiGetDP = (_id) =>
  axios({
    url: `/datphong/get/${_id}`,
    method: "get",
  });

export const apiUpdateDP = (_id, data) =>
  axios({
    url: `/datphong/update/${_id}`,
    method: "put",
    data,
  });

export const apiDeleteDP = (_id) =>
  axios({
    url: `/datphong/delete/${_id}`,
    method: "delete",
  });

export const apiCountDP = () =>
  axios({
    url: `/datphong/static`,
    method: "get",
  });
