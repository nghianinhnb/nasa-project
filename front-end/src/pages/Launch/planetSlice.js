import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import planetApi from "api/planetApi";


export const thunkGetAllPlanets = createAsyncThunk(
    'planet/all',
    async (params, thunkAPI) => {
        const res = await planetApi.getAllPlanets();
        return res;
    }
)


const planetSlice = createSlice({
    name: 'planet',
    initialState: {
        planets: [],
    },
    reducers: {},
    extraReducers: {
        [thunkGetAllPlanets.fulfilled]: (state, action) => {
            const {result, planets} = action.payload.data;
            if (result==='success') {
                state.planets = planets;
            }
        }
    }
})


const {reducer} = planetSlice;

// export const {} = actions;
export default reducer;
