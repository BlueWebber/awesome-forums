import jwt_decode from "jwt-decode";
import config from "../config";

const authName = config.authTokenName;

export const getToken = () =>
  localStorage.getItem(authName) || sessionStorage.getItem(authName);

export const getDecodedToken = () => getToken() && jwt_decode(getToken());

export const setToken = (token, rememberUser) => {
  if (rememberUser === "local") {
    rememberUser = localStorage.getItem("rememberUser");
  }
  if (rememberUser) {
    localStorage.setItem(authName, token);
  } else {
    sessionStorage.setItem(authName, token);
  }
  localStorage.setItem("rememberUser", rememberUser);
};

export const wipeToken = () => {
  localStorage.removeItem(authName);
  localStorage.removeItem("rememberUser");
  sessionStorage.removeItem(authName);
};
