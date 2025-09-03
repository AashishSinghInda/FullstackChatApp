import axios from "axios";



import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const instance = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

// attach access token if exists
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// simple queuing so multiple 401s wait for a single refresh
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}
function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // mark we are retrying this request
      originalRequest._retry = true;

      if (isRefreshing) {
        // if another refresh is in progress, queue this request
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            resolve(instance(originalRequest));
          });
        });
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // use plain axios to avoid interceptors on this call
        const { data } = await axios.post(`${BASE}/web/auth/refresh-token`, {
          refreshToken,
        });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        isRefreshing = false;
        onRefreshed(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;












































































































































/*   const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/web/auth",
  withCredentials: true,
});

// ✅ Request Interceptor — Attach access token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response Interceptor — Handle access token expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ If access token expired → call refresh API
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // ✅ Get new tokens from backend
        const res = await axios.post(
          "http://localhost:5000/web/auth/refresh-token",
          { refreshToken }
        );

        // ✅ Save new tokens
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        // ✅ Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // ❌ Refresh token expired → logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;   */ 