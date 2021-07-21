import axios from "axios";

const http = axios.create({
  baseURL: "https://be.fx-signal.club/fx-signal/api/data",
  timeout: 60000,
});
export const interceptors = (store) => {
  // http.interceptors.request.use(
  //   function (config) {
  //     let token = store.getState()?.auth?.token;
  //     return config;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );

  http.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response?.data?.data;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger

      return Promise.reject(error.response.data.message);
    }
  );
};

export default http;
