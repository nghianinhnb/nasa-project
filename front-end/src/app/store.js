import launchReducer from 'pages/Upcoming/launchSlice';
import planetReducer from 'pages/Launch/planetSlice';


const { configureStore } = require("@reduxjs/toolkit");


const rootReducer = {
    planet: planetReducer,
    launch: launchReducer,
}


const store = configureStore({
    reducer: rootReducer,
})

export default store;
