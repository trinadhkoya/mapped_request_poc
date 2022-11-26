import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3/";
export const API_KEY = "e6cc375219f5ddb0e3510188bef603e0";

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json"
};

const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS
});

axiosApi.interceptors.request.use((config) => {
  // use config.params if it has been set
  config.params = config.params || {};
  // add any client instance specific params to config
  config.params["api_key"] = API_KEY;
  config.params["language"] = "en-US";
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const get = async (url, config) =>
  await axiosApi
    .get(url, {
      ...config
    })
    .then((response) => response?.data?.results);
