import axios from "../axios";

export const apiAllLP = () =>
  axios({
    url: "/loaiphong",
    method: "get",
  });

export const apiAddLP = (data) =>
  axios({
    url: "/loaiphong/add",
    method: "post",
    data,
  });
