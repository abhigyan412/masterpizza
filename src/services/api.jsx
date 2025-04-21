import axios from "axios";

const serviceBase = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

serviceBase.interceptors.request.use((config) => {
  console.log("Req", config);
  if (!config.url.includes("getorderheaderinfo")) {
    document.body.classList.add("loading-indicator");
  }
  return config;
});
serviceBase.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    document.body.classList.remove("loading-indicator");
    return response;
  },
  (error) => {
    console.error("Response Error", error);
    setTimeout(() => {
      document.body.classList.remove("loading-indicator");
    }, 1000);
    return Promise.reject(error);
  }
);

export default serviceBase;
