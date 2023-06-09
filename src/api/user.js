import axios from "../axios";

export const apiLogin = (data) =>
  axios({
    url: "/account/loginAdmin",
    method: "post",
    data,
  });

export const apiLogout = () =>
  axios({
    url: "/account/logout",
    method: "get",
    withCredentials: true,
  });

  export const Auth = () =>
  axios({
    url: `/account/auth`,
    method: "get",
  });

export const getAccessToken = () =>
  axios({
    url: `/account/accesstoken`,
    method: "get",
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
