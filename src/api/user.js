import axios from "../axios";

export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });

export const apiLogout = () =>
  axios({
    url: "/user/logout",
    method: "get",
    withCredentials: true,
  });

export const apiAllUser = () =>
  axios({
    url: "/user",
    method: "get",
  });

export const apiGetUser = (Email) =>
  axios({
    url: `/user/get/${Email}`,
    method: "get",
  });

export const apiCreateUser = (data) =>
  axios({
    url: "/user/create",
    method: "post",
    data,
  });

export const apiUpdateUser = (Email, data) =>
  axios({
    url: `/user/update/${Email}`,
    method: "put",
    data,
  });

export const apiDeleteUser = (Email) =>
  axios({
    url: `/user/delete/${Email}`,
    method: "delete",
  });
