import axios from "axios";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import router from "@/router";
import authToken from "./authToken";
import { useSnackBarStore } from "@/stores/snackBar";

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

let isRefreshing = false;
let requestQueue = [];

const callRequestsFromQueue = (error, accessToken) => {
  requestQueue.forEach((req) => {
    if (error) req.reject(error);
    else req.resolve(accessToken);
  });
  requestQueue = [];
};

// Axios default setup
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

axios.interceptors.request.use(
  (req) => {
    const { accessToken, refreshToken } = authToken.getAccessToken();

    if (accessToken && refreshToken && refreshToken.split(".").length === 3) {
      try {
        const decoded = jwtDecode(refreshToken);
        const isExpired = moment.unix(decoded.exp).diff(moment()) < 1;

        if (isExpired) {
          authToken.removeAccessToken();
          router.push({ name: "Login" });
          return null;
        }

        return req;
      } catch (err) {
        console.error("Refresh token decode failed:", err);
        authToken.removeAccessToken();
        router.push({ name: "Login" });
        return null;
      }
    }

    return req;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const req = error.config;
    const snackbar = useSnackBarStore();

    if (error.response?.status === 401 && !req._retry) {
      const { refreshToken } = authToken.getAccessToken();

      if (error.response.data.code === "user_not_found") {
        authToken.removeAccessToken();
        router.push({ name: "Login" });
        return null;
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          requestQueue.push({ resolve, reject });
        }).then((accessToken) => {
          req.headers.token = accessToken;
          return axios(req);
        });
      }

      req._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        alert("Refresh token api to be called");
        console.log(resolve, reject);
      });
    }

    return Promise.reject(error);
  }
);

// Core API wrapper
const api_call = (
  method,
  url,
  {
    headers = {},
    params = {},
    data = {},
    lookUpKey = "",
    onSuccess = null,
    onFailure = null,
    onFinally = null,
    responseType = "json",
    onUploadProgress = null,
    onDownloadProgress = null,
    isTokenRequired = true,
    cancel = false,
  } = {}
) => {
  const snackbar = useSnackBarStore();

  const config = {
    method,
    url: lookUpKey ? `${url}/${lookUpKey}` : url,
    headers,
    params,
    data,
    responseType,
    onUploadProgress,
    onDownloadProgress,
  };

  if (cancel) {
    source.cancel();
    source = CancelToken.source();
    config.cancelToken = source.token;
  }

  if (isTokenRequired) {
    const { accessToken } = authToken.getAccessToken();
    console.log("accessToken", accessToken);
    if (accessToken) {
      headers.token = accessToken;
    }
  }

  return axios(config)
    .then((response) => {
      if (response?.data?.status === false) {
        snackbar.showToast({
          message:
            response.data.data ||
            response.data.message ||
            "Something went wrong.",
          color: "error",
        });
        if (onFailure) onFailure(response);
        return;
      }

      if (onSuccess) onSuccess(response);
    })
    .catch((error) => {
      if (onFailure) onFailure(error.response || error);
      snackbar.showToast({
        message: error?.response?.data?.detail || "API Error",
        color: "error",
      });
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
};

export default api_call;
