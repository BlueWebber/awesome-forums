import Axios from "axios";
import config from "../config";
import { setToken, getDecodedToken } from "../services/auth";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

const authName = config.authTokenName;
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401 && getDecodedToken()) {
      return axios
        .post("/refresh")
        .then((response) => {
          error.config.headers[authName] = response.data;
          setToken(response.data, "local");
          axios.defaults.headers.common[authName] = response.data;
          return axios.request(error.config);
        })
        .catch((err) => {
          const message = err?.response?.data?.message;
          if (message.startsWith("User credentials")) {
            window.location = "/login";
          }
          return Promise.reject(err);
        });
    }

    return Promise.reject(error);
  }
);

axios.defaults.headers.common[authName] =
  localStorage.getItem(authName) || sessionStorage.getItem(authName);

export default axios;
