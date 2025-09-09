
/* import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

//  Request Interceptor → Access token har request me add hota hai
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

//  Response Interceptor → Access token expire hone par naya generate hota hai
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      //  Refresh token use karke naya access token lo
      const { data } = await API.post("/refresh-token", { refreshToken });

      //  Naya access token localStorage me save karo
      localStorage.setItem("accessToken", data.accessToken);

      //  Pehle wali request retry karo
      error.config.headers.Authorization = `Bearer ${data.accessToken}`;
      return API.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default API;   */











































/* import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Request Interceptor  accesstoken har request me add hota hai 
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
);   */ 
