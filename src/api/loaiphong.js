import axios from "../axios";


export const apiAllLP = () =>
  axios({
    url: "/loaiphong",
    method: "get",
  });