import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import launchApi from "api/launchApi";


export const thunkGetLaunchs = createAsyncThunk(
    'launch/all',
    async (params, thunkAPI) => {
        const res = await launchApi.getAllLaunch();
        return res;
    }
)

export const thunkAbortLaunch = createAsyncThunk(
    'launch/abort',
    async (params, thunkAPI) => {
        const res = await launchApi.abortLaunch(params);
        return {res, params};
    }
)

export const thunkCreateLaunch = createAsyncThunk(
    'launch/create',
    async (params, thunkAPI) => {
        const res = await launchApi.createLaunch(params);
        return res;
    }
)


const launchSlice = createSlice({
    name: 'launch',
    initialState: {
        createPending: false,
        launches: [],
    },
    reducers: {
        updateCreatePending: (state, action) => {
            state.createPending = action.payload;
        },
        addLaunch: (state, action) => {
            state.launches.push(action.payload);
        },
        abortLaunch: (state, action) => {
            state.launches.forEach(item => {
                if (item._id === action.payload) {
                    item['upcoming'] = false;
                    item['success'] = false;
                }
            })
        },
    },
    extraReducers: {
        // Get all Launch
        [thunkGetLaunchs.fulfilled]: (state, action) => {
            const {result, launches} = action.payload.data;
            if (result==='success' && launches.length) {
                state.launches = launches;
            }
        },
    },
})


const { reducer, actions } = launchSlice;


export const {updateCreatePending, addLaunch, abortLaunch} = actions;

export default reducer;
