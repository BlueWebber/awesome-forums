import { getToken, getDecodedToken, setToken } from "./auth";
import axios from "../plugins/axios";

const getSettingsFromApi = async () => {
  const user = getDecodedToken();
  if (user?.user_id) {
    const { data } = await axios.get(`/users/${user.user_id}`);
    const settingsData = data?.settings;
    if (settingsData) {
      setSettings(settingsData);
      return settingsData;
    }
  }
};

export const getSettings = async () => {
  const settings = JSON.parse(
    localStorage.getItem("settings") || sessionStorage.getItem("settings")
  );
  if (settings) return settings;
  return getSettingsFromApi();
};

const getStorage = () => {
  return getToken() ? localStorage : sessionStorage;
};

const setStorageSetting = async (item) => {
  const settings = await getSettings();
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
  const data = await getSettingsFromApi();
  if (data) return data[name];
};

export const clearSettings = () => {
  localStorage.removeItem("settings");
  sessionStorage.removeItem("settings");
};
