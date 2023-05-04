import axios from "axios";

const callApi = (
  url,
  data = null,
  headers = {},
  method = "GET",
  responseType = "json",
  isFormData = false
) => {
  if (!headers) headers = {};

  headers = {
    "Content-Type": !isFormData ? "application/json" : "multipart/form-data",
    ...headers,
  };

  let params = {};
  if (!(method === "PUT" || method === "POST" || method === "PATCH")) {
    params = data;
    data = {};
  }

  return axios({
    method,
    url,
    data,
    params,
    headers,
    responseType: responseType,
  })
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        const status = error.response.status;
        if (status === 401) {
          auth_actions.logout();
          return;
        }
        // environment should not be used
        if (status === 403) {
          // history.replace("/404");
          // return error.response;
        }
        if (status <= 504 && status >= 500) {
          // router.push('/exception/500');
          return;
        }
        if (status >= 404 && status < 422) {
          return error.response;
          // history.replace('/404');
          return;
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Api error", error.message);
      }
      //Error config
      console.log("Api default error", error.config);
    });
};

export const apiGet = async (url, params = null, headers = {}) => {
    return await callApi(url, params, headers, "GET", "json");
};