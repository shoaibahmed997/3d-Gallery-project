import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers";


const store = configureStore({
    reducer:{
        userState :userReducer

    }
})

export default store