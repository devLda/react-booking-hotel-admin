import {
  apiGetAll,
  // apiGet,
  apiPost,
  // apiDelete,
  // apiPut,
  apiURL,
} from "../../api";

const Url = {
  getLoaiPhong: apiURL + "loaiphong",
  addLP: apiURL + "loaiphong/add",
  // getUser: apiURL + "loaiphong/",
  // updateUser: apiURL + "loaiphong/",
  // deleteUser: apiURL + "loaiphong/",
};

const api = {
  listLoaiPhong: (param) => {
    return apiGetAll(Url.getLoaiPhong, { ...param });
  },
  addLP: (param) => {
    return apiPost(Url.addLP, { ...param });
  },
  // getUser: (param) => {
  //   return apiGet(Url.getUser, param);
  // },
  // updateUser: (param) => {
  //   return apiPut(Url.updateUser, { ...param });
  // },
  // deleteUser: (param) => {
  //   return apiDelete(Url.deleteUser, param);
  // },
};

export default api;
