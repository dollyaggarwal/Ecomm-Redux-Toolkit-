import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./Reducers/itemsReducer";
import {cartReducer } from "./Reducers/cartReducer";


export const store = configureStore({
    reducer:{
        itemReducer,
        cartReducer,
    }
})