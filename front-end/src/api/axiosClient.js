import axios from "axios";
import Global from 'general/Global';
import queryString from "query-string";


const sTag = "[AxiosClient]";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'api/v1',
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

    if (Global.accessToken) {
      config.headers.Authorization = `Bearer ${Global.accessToken}`;
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

      // Auto Refresh Token
      const config = error.config;
      if (
        config.url !== "/sign-in" && config.url !== "/refresh-token" &&
        error.response && error.response.status === 401
      ) {
        let res = await axios.post((process.env.REACT_APP_API_URL || 'api/v1') + '/refresh-token', {refreshToken: Global.refreshToken});

        const {result, accessToken, refreshToken} = res.data;
        if (result==='success') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          Global.accessToken = accessToken;
          Global.refreshToken = refreshToken;
          return axiosClient(config);
        }
      }
      //

      return Promise.reject(error)
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
