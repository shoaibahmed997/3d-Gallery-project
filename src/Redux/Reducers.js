import { createReducer } from "@reduxjs/toolkit";

// initial states
const userInitialState = {
    user:  {nickname:"",email:null,id:0}
}


export const userReducer = createReducer(userInitialState,{
    'ADD_USER': (state,action)=>{
        state.user = action.payload
    },
    "REMOVE_USER" :(state,action)=>{
        state.user = {user:{nickname:"",email:null,id:0}}
    }
})

