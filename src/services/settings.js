import { getToken, getDecodedToken, setToken } from "./auth";
import axios from "../plugins/axios";

const getSettings = () => {
  return JSON.parse(
    localStorage.getItem("settings") || sessionStorage.getItem("settings")
  );
};

const getStorage = () => {
  return getToken() ? localStorage : sessionStorage;
};

const setStorageSetting = (item) => {
  const settings = getSettings();
  getStorage().setItem("settings", JSON.stringify({ ...settings, ...item }));
};

export const setSetting = async (settingObj) => {
  setStorageSetting(settingObj);
  const user = getDecodedToken();
  if (user?.user_id) {
    const { data } = await axios.patch(`/users/${user.user_id}`, {
      settings: settingObj,
    });
    setToken(data.token, "local");
  }
};

const setSettings = (settings) => {
  getStorage().setItem("settings", JSON.stringify(settings));
};

export const getSetting = async (name) => {
  const storageItem = getStorage().getItem("settings");
  const settings = storageItem && JSON.parse(storageItem);
  const item = settings && settings[name];
  if (item) return item;
  const user = getDecodedToken();
  if (user?.user_id) {
    const { data } = await axios.get(`/users/${user.user_id}`);
    const settingsData = data?.settings;
    if (settingsData) {
      setSettings(settingsData);
      return settingsData[name];
    }
  }
};

export const clearSettings = () => {
  localStorage.removeItem("settings");
  sessionStorage.removeItem("settings");
};
