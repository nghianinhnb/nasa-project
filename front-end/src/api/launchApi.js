import axiosClient from "./axiosClient";


const launchApi = {
    getAllLaunch: () => {
        const url = `/launches`;
        return axiosClient.get(url);
    },

    createLaunch: (params) => {
        const url = `/launches`;
        return axiosClient.post(url, params);
    },

    abortLaunch: (params) => {
        const url = `/launches`;
        return axiosClient.put(url, params);
    }
};


export default launchApi;
