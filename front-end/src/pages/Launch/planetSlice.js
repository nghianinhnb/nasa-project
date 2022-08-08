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
        pending: false,
    },
    reducers: {},
    extraReducers: {
        [thunkGetAllPlanets.pending]: (state, action) => {
            state.pending = true;
        },
        [thunkGetAllPlanets.rejected]: (state, action) => {
            state.pending = false;
        },
        [thunkGetAllPlanets.fulfilled]: (state, action) => {
            state.pending = false;
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
