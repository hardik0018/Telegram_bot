const axios = require("axios");

const MY_TOKEN = "7603677002:AAGSYmGLIhR2qoOy9AEAX7vbxe-luyjL0Ww";
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;

const getAxiosInstance = () => {
  return {
    get(method, params) {
      return axios.get(`/${method}`, {
        baseURL: BASE_URL,
        params,
      });
    },
    post(method, data) {
      return axios({
        method: "POST",
        baseURL: BASE_URL,
        url: `/${params}`,
        data,
      });
    },
  };
};

module.exports = { axiosInstance: getAxiosInstance() };
