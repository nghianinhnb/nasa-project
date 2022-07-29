import axiosClient from "./axiosClient";


const planetApi = {
    getAllPlanets: () => {
        const url = `/planets`;
        return axiosClient.get(url);
    }
}


export default planetApi;
