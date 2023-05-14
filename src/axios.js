import axios from "axios";
import path from "./utils/path";

const instance = axios.create({
  withCredentials: true,
  baseURL: path.URL_API,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return err.response.data;
  }
);

export default instance;
