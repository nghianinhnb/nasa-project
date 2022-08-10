import axiosClient from "./axiosClient";


const userApi = {
    signIn: (params) => {
        const url = `/sign-in`;
        return axiosClient.post(url, params);
    },

    signUp: (params) => {
        const url = `/sign-up`;
        return axiosClient.post(url, params);
    }
}


export default userApi;
