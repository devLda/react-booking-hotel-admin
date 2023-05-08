import { apiGet, apiPost, apiDelete, apiURL } from "../../api";

const Url = {
  getAccount: apiURL + "user",
  addUser: apiURL + "user/add",
  deleteUser: apiURL + "user",
};

const api = {
  listAccount: (param) => {
    return apiGet(Url.getAccount, { ...param });
  },
  addUser: (param) => {
    return apiPost(Url.addUser, { ...param });
  },
  deleteUser: (param) => {
    return apiDelete(Url.deleteUser, { ...param });
  },
};

export default api;
