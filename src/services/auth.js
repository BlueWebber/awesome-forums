import jwt_decode from "jwt-decode";
import config from "../config";

const authName = config.authTokenName;

export const getToken = () =>
  localStorage.getItem(authName) || sessionStorage.getItem(authName);

export const getDecodedToken = () => getToken() && jwt_decode(getToken());

export const setToken = (token, rememberUser) => {
  if (rememberUser) {
    localStorage.setItem(authName, token);
  } else {
    sessionStorage.setItem(authName, token);
  }
};

export const wipeToken = () => {
  localStorage.removeItem(authName);
  sessionStorage.removeItem(authName);
};
