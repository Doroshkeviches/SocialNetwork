import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import  toolKitSlice from './toolkitReducer.js'
import { useDispatch } from "react-redux";


const rootReducer = combineReducers({
    toolkit: toolKitSlice
})

export const store = configureStore({
    reducer: rootReducer,
})
export const useAppDispatch = () => useDispatch();


