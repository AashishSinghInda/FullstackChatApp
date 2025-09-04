import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Request Interceptor
API.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Response Interceptor for 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      console.log("==============>>>>>>>>>>>>>>>>>>>>");
      
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await API.post("/refresh-token", { refreshToken });
      localStorage.setItem("accessToken", data.accessToken);

      error.config.headers.Authorization = `Bearer ${data.accessToken}`;
      return API.request(error.config);
    }
    return Promise.reject(error);
  }
);
