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
