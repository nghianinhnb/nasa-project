import axios from "axios";
import Global from 'general/Global';
import queryString from "query-string";


const sTag = "[AxiosClient]";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "content-type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});


axiosClient.interceptors.request.use(async (config) => {
    console.log(
      `${sTag} - ${config.baseURL}${config.url}, ${config.method}, ${
        config.method === "post" || config.method === "put"
          ? JSON.stringify(config.data)
          : JSON.stringify(config.params)
      }`
    );
    console.log(`${sTag} - headers: ${JSON.stringify(config.headers.common)}`);

    const accessToken = Global.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});


axiosClient.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return { data: response.data, headers: response.headers };
      }
  
      return response;
    },
    async (error) => {
      console.log({ error });

      // let errorMessage = null;
      // const response = error.response;
      // if (response && response.data) {
      //   const data = response.data;
      //   const { result, reason } = data;
      //   if (result === "failed" && reason) {
      //     errorMessage = reason;
      //   }
      // }

      return error;
    }
);


// Update base url
const updateAxiosBaseURL = (baseUrl) => {
  axiosClient.defaults.baseURL = baseUrl;
};

// Update access token
const updateAxiosAccessToken = (accessToken) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// Remove access token
const removeAxiosAccessToken = () => {
  delete axiosClient.defaults.headers.common["Authorization"];
};


export { updateAxiosAccessToken, removeAxiosAccessToken, updateAxiosBaseURL };

export default axiosClient;
