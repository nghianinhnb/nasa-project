import { removeAxiosAccessToken } from "api/axiosClient";


const UserHelper = {
    isAuthentication: () => {
        if (localStorage.getItem('refreshToken')) return true;
        return false;
    },

    // Sign out
    signOut: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        removeAxiosAccessToken();
    },

};


export default UserHelper;
