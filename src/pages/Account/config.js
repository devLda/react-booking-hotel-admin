import { apiGetAll, apiGet, apiPost, apiDelete, apiPut, apiURL } from "../../api";

const Url = {
  getAccount: apiURL + "user",
  addUser: apiURL + "user/add",
  getUser: apiURL + "user/",
  updateUser: apiURL + "user/",
  deleteUser: apiURL + "user/",
};

const api = {
  listAccount: (param) => {
    return apiGetAll(Url.getAccount, { ...param });
  },
  addUser: (param) => {
    return apiPost(Url.addUser, { ...param });
  },
  getUser: (param) => {
    return apiGet(Url.getUser, param);
  },
  updateUser: (param) => {
    return apiPut(Url.updateUser, param);
  },
  deleteUser: (param) => {
    return apiDelete(Url.deleteUser, param);
  },
};

export default api;
