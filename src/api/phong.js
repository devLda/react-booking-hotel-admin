import axios from "../axios";

export const apiMultiDataPhong = () =>
  axios({
    url: "/phong/multiphong",
    method: "get",
  });

export const apiAllPhong = () =>
  axios({
    url: "/phong",
    method: "get",
  });

export const apiAddPhong = (data) =>
  axios({
    url: "/phong/add",
    method: "post",
    data,
  });

export const apiGetPhong = (_id) =>
  axios({
    url: `/phong/get/${_id}`,
    method: "get",
  });

export const apiUpdatePhong = (_id, data) =>
  axios({
    url: `/phong/update/${_id}`,
    method: "put",
    data,
  });

export const apiDeletePhong = (_id) =>
  axios({
    url: `/phong/delete/${_id}`,
    method: "delete",
  });

export const apiStaticPhong = () =>
  axios({
    url: `/phong/static`,
    method: "get",
  });
